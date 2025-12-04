# 🏨 ASAABE Hotel Management System

A comprehensive, market-ready hotel management system built with Django REST Framework and Next.js, featuring modern UI/UX design, advanced booking management, and integrated payment processing.

## ✨ Features

### 🎯 Core Features
- **Modern Hotel Booking System** - Complete room reservation workflow
- **User Authentication & Authorization** - JWT-based secure authentication
- **Advanced Room Management** - Comprehensive room catalog with filtering
- **Multi-step Booking Process** - Intuitive booking flow with guest details
- **Payment Integration** - Stripe payment processing
- **Admin Dashboard** - Complete hotel management interface
- **Responsive Design** - Mobile-first, responsive UI
- **Real-time Availability** - Dynamic room availability checking

### 🏨 Hotel-Specific Features
- **Room Types & Categories** - Standard, Deluxe, Suite, Presidential Suite
- **Amenities Management** - WiFi, Pool, Spa, Gym, Room Service, etc.
- **Room Features** - Balcony, Sea View, City View, Minibar, Safe
- **Guest Management** - Multiple guests per booking with details
- **Booking Status Tracking** - Pending, Confirmed, Checked-in, Checked-out
- **Review System** - Guest reviews and ratings
- **Special Requests** - Custom guest requirements handling

### 💼 Business Features
- **Revenue Management** - Dynamic pricing and revenue tracking
- **Occupancy Analytics** - Room utilization statistics
- **Guest History** - Complete guest booking history
- **Staff Management** - Role-based access control
- **Reporting** - Comprehensive business reports
- **Email Notifications** - Automated booking confirmations

## 🛠️ Technology Stack

### Backend
- **Django 5.2.8** - Python web framework
- **Django REST Framework** - API development
- **PostgreSQL** - Primary database
- **JWT Authentication** - Secure token-based auth
- **Stripe API** - Payment processing
- **Django CORS** - Cross-origin resource sharing
- **Pillow** - Image processing

### Frontend
- **Next.js 16** - React framework
- **Material-UI (MUI)** - Component library
- **TypeScript** - Type-safe JavaScript
- **Axios** - HTTP client
- **Date-fns** - Date manipulation
- **Stripe.js** - Payment integration

## 🚀 Quick Start

### Prerequisites
- Python 3.11+
- Node.js 18+
- PostgreSQL 12+
- Git

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ASAABE_HOTEL_SYSTEM/backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Database setup**
   ```bash
   # Create PostgreSQL database
   createdb asaabe_db
   
   # Run migrations
   python manage.py makemigrations
   python manage.py migrate
   ```

5. **Create sample data**
   ```bash
   python manage.py populate_sample_data
   ```

6. **Create superuser**
   ```bash
   python manage.py createsuperuser
   ```

7. **Run development server**
   ```bash
   python manage.py runserver
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd ../frontend/asaabe-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   # Copy and edit environment file
   cp .env.local.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

## 📁 Project Structure

```
ASAABE_HOTEL_SYSTEM/
├── backend/
│   ├── asaabe/                 # Main Django project
│   ├── users/                  # User management app
│   ├── rooms/                  # Room management app
│   ├── bookings/              # Booking management app
│   ├── payments/              # Payment processing app
│   ├── requirements.txt       # Python dependencies
│   └── manage.py             # Django management script
├── frontend/
│   ├── asaabe-frontend/
│   │   ├── pages/            # Next.js pages
│   │   ├── src/
│   │   │   ├── components/   # Reusable components
│   │   │   ├── services/     # API services
│   │   │   └── theme.ts      # MUI theme configuration
│   │   ├── public/           # Static assets
│   │   └── package.json      # Node.js dependencies
└── README.md
```

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
SECRET_KEY=your-secret-key
DEBUG=True
DATABASE_URL=postgresql://user:password@localhost:5432/asaabe_db
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
```

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
```

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register/` - User registration
- `POST /api/auth/login/` - User login
- `POST /api/auth/refresh/` - Token refresh
- `GET /api/auth/profile/` - User profile

### Rooms
- `GET /api/rooms/` - List rooms with filtering
- `GET /api/rooms/{id}/` - Room details
- `GET /api/rooms/featured/` - Featured rooms
- `POST /api/rooms/{id}/add_review/` - Add room review

### Bookings
- `GET /api/bookings/` - User bookings
- `POST /api/bookings/` - Create booking
- `POST /api/bookings/{id}/confirm/` - Confirm booking
- `POST /api/bookings/{id}/cancel/` - Cancel booking

### Payments
- `POST /api/payments/create-intent/` - Create payment intent
- `POST /api/payments/confirm/` - Confirm payment

## 🎨 Design System

### Brand Colors
- **Primary**: #0F1B2D (Deep Navy)
- **Secondary**: #C8A45D (Gold)
- **Background**: #F6F7F9 (Light Gray)
- **Success**: #2FB47C (Green)
- **Error**: #D64C4C (Red)

### Typography
- **Primary Font**: Inter
- **Display Font**: Playfair Display

## 🔐 Security Features

- JWT-based authentication
- Password validation
- CORS protection
- SQL injection prevention
- XSS protection
- CSRF protection
- Secure payment processing

## 📱 Mobile Responsiveness

- Mobile-first design approach
- Responsive breakpoints
- Touch-friendly interfaces
- Optimized mobile navigation
- Fast loading on mobile networks

## 🚀 Deployment

### Backend Deployment (Heroku/Railway)
1. Configure production settings
2. Set up PostgreSQL database
3. Configure environment variables
4. Deploy using Git

### Frontend Deployment (Vercel/Netlify)
1. Connect GitHub repository
2. Configure build settings
3. Set environment variables
4. Deploy automatically on push

## 🧪 Testing

### Backend Testing
```bash
python manage.py test
```

### Frontend Testing
```bash
npm run test
```

## 📈 Performance Optimization

- Database query optimization
- Image optimization
- Lazy loading
- Caching strategies
- CDN integration
- Minification and compression

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Lead Developer**: Expert Full-Stack Developer
- **UI/UX Designer**: Modern Design Specialist
- **Backend Architect**: Django & API Expert
- **Frontend Specialist**: React & Next.js Expert

## 📞 Support

For support and questions:
- Email: support@asaabehotel.com
- Documentation: [Project Wiki](link-to-wiki)
- Issues: [GitHub Issues](link-to-issues)

## 🎯 Roadmap

### Phase 1 ✅
- [x] Core booking system
- [x] User authentication
- [x] Payment integration
- [x] Admin dashboard

### Phase 2 🚧
- [ ] Mobile app (React Native)
- [ ] Advanced analytics
- [ ] Multi-language support
- [ ] Integration with hotel management systems

### Phase 3 📋
- [ ] AI-powered recommendations
- [ ] IoT integration
- [ ] Advanced reporting
- [ ] Third-party integrations

---

**ASAABE Hotel Management System** - Where Technology Meets Hospitality Excellence 🏨✨