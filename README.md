# Smart Feedback System

A full-stack web application for collecting, analyzing, and managing product feedback with sentiment analysis and visualization capabilities.

## 📋 Project Overview

Smart Feedback System is a comprehensive solution for gathering and processing customer feedback. It features a Django REST API backend with sentiment analysis capabilities and a modern React frontend for an intuitive user experience.

## 🏗️ Project Structure

```
smart_feedback_system/
├── backend/                    # Django REST API
│   ├── backend/               # Django settings & configuration
│   ├── feedback/              # Feedback app
│   │   ├── models.py          # Database models
│   │   ├── views.py           # API views
│   │   ├── serializers.py     # DRF serializers
│   │   ├── urls.py            # URL routing
│   │   └── migrations/        # Database migrations
│   ├── manage.py              # Django management command
│   ├── package.json           # Node dependencies (if applicable)
│   └── requirements.txt       # Python dependencies
│
├── frontend/                  # React + Vite Application
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── App.jsx            # Main app component
│   │   ├── main.jsx           # Entry point
│   │   └── assets/            # Static assets
│   ├── public/                # Public files
│   ├── index.html             # HTML template
│   ├── package.json           # Node dependencies
│   ├── vite.config.js         # Vite configuration
│   └── eslint.config.js       # ESLint configuration
│
├── test_feedbacks.csv         # Sample test data
└── README.md                  # This file
```

## 💻 Tech Stack

### Backend
- **Framework**: Django & Django REST Framework
- **Database**: MySQL/SQLite
- **Sentiment Analysis**: TextBlob, VADER Sentiment
- **Language**: Python 3.8+

### Frontend
- **Framework**: React 18+
- **Build Tool**: Vite
- **Styling**: CSS
- **HTTP Client**: Axios

## 🚀 Getting Started

### Prerequisites
- Python 3.8 or higher
- Node.js 14+ and npm
- MySQL/SQLite (for database)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install Python dependencies:
```bash
pip install -r requirements.txt
```

4. Run database migrations:
```bash
python manage.py migrate
```

5. Create a superuser (optional):
```bash
python manage.py createsuperuser
```

6. Start the development server:
```bash
python manage.py runserver
```

The backend will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173` (or the port specified by Vite)

## 📦 Key Features

- **User Authentication**: Login and signup functionality
- **Feedback Management**: Create, read, update, and delete feedback entries
- **Sentiment Analysis**: Automatic sentiment classification of feedback
- **Product Tracking**: Associate feedback with specific products
- **Data Visualization**: Charts and analytics dashboard
- **Responsive Design**: Works on desktop and mobile devices

## 🔧 Available Scripts

### Backend
```bash
python manage.py runserver          # Start development server
python manage.py migrate            # Run database migrations
python manage.py createsuperuser    # Create admin user
python manage.py collectstatic      # Collect static files
```

### Frontend
```bash
npm run dev                         # Start development server
npm run build                       # Build for production
npm run preview                     # Preview production build
npm run lint                        # Run ESLint
```

## 🗄️ Database Schema

The system includes the following main models:

- **User**: Authentication and user management
- **Feedback**: Core feedback entries with sentiment analysis
- **Product**: Product information for categorizing feedback

## 🔐 API Endpoints

- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `GET/POST /api/feedback/` - List and create feedback
- `GET/PUT/DELETE /api/feedback/{id}/` - Manage specific feedback
- `GET/POST /api/products/` - Manage products

## 📝 Sample Data

A `test_feedbacks.csv` file is included with sample feedback data for testing purposes.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Support

For support, please open an issue on the GitHub repository or contact the development team.

## 🔗 Links

- **Repository**: https://github.com/Renump/smart-feedback-system
- **Issues**: https://github.com/Renump/smart-feedback-system/issues

---

**Last Updated**: May 2026
