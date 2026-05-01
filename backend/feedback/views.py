from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Feedback
from textblob import TextBlob
from django.db.models import Count
import pandas as pd
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from rest_framework.parsers import MultiPartParser
from rest_framework.decorators import parser_classes

# Initialize VADER
analyzer = SentimentIntensityAnalyzer()



# 🔐 Register
@api_view(['POST'])
def register_user(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')

    if User.objects.filter(username=username).exists():
        return Response({"error": "Username already exists"}, status=400)

    User.objects.create_user(
        username=username,
        email=email,
        password=password
    )

    return Response({"message": "User registered successfully"})


# 🔐 Login
@api_view(['POST'])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)

    if user is not None:
        return Response({
            "message": "Login successful",
            "isAdmin": user.is_superuser
        })
    else:
        return Response({"error": "Invalid credentials"}, status=400)


# 🧠 Sentiment
def analyze_sentiment(text):
    polarity = TextBlob(text).sentiment.polarity

    if polarity > 0:
        return "Positive"
    elif polarity < 0:
        return "Negative"
    return "Neutral"


# 💬 Submit Feedback (linked to real user)
@api_view(['POST'])
def submit_feedback(request):
    text = request.data.get('text')
    username = request.data.get('username')   # 👈 get username
    product = request.data.get('product', 'General') # 👈 get product, default to General

    if not text:
        return Response({"error": "Text is required"}, status=400)

    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=404)

    sentiment = analyze_sentiment(text)

    Feedback.objects.create(
        user=user,
        product=product,
        text=text,
        sentiment=sentiment
    )

    return Response({
        "message": "Feedback saved",
        "sentiment": sentiment
    })


# 📊 Chart Data
@api_view(['GET'])
def feedback_stats(request):
    data = Feedback.objects.values('sentiment').annotate(count=Count('id'))
    return Response(data)


# 📋 Admin: View all feedback + users
@api_view(['GET'])
def get_all_feedback(request):
    data = Feedback.objects.select_related('user').values(
        'id',
        'user_id',
        'user__username',
        'product',
        'text',
        'sentiment'
    )
    return Response(data)


# ❌ Admin: Delete user
@api_view(['DELETE'])
def delete_user(request, id):
    try:
        user = User.objects.get(id=id)
        user.delete()
        return Response({"message": "User deleted successfully"})
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=404)


# 📁 CSV Bulk Upload & Analyze
@api_view(['POST'])
@parser_classes([MultiPartParser])
def upload_csv(request):
    file = request.FILES.get('file')
    if not file:
        return Response({"error": "No file uploaded"}, status=400)
    
    if not file.name.endswith('.csv'):
        return Response({"error": "File must be a CSV"}, status=400)
        
    try:
        df = pd.read_csv(file)
        
        # Try to find a text column
        text_column = None
        for col in df.columns:
            if str(col).lower() in ['text', 'feedback', 'review', 'comment', 'message']:
                text_column = col
                break
                
        if not text_column:
            # default to first column
            text_column = df.columns[0]
            
        positive = 0
        negative = 0
        neutral = 0
        
        for text in df[text_column].dropna():
            vs = analyzer.polarity_scores(str(text))
            compound = vs['compound']
            if compound >= 0.05:
                positive += 1
            elif compound <= -0.05:
                negative += 1
            else:
                neutral += 1
                
        return Response({
            "message": "CSV analyzed successfully",
            "stats": [
                {"sentiment": "Positive", "count": positive},
                {"sentiment": "Negative", "count": negative},
                {"sentiment": "Neutral", "count": neutral}
            ]
        })
    except Exception as e:
        return Response({"error": str(e)}, status=500)