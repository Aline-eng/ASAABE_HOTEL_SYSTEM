#!/usr/bin/env python3
"""
ASAABE Hotel Management System Setup Script
Automated setup for development environment
"""

import os
import sys
import subprocess
import platform

def run_command(command, cwd=None):
    """Run a command and return the result"""
    try:
        result = subprocess.run(command, shell=True, cwd=cwd, capture_output=True, text=True)
        if result.returncode != 0:
            print(f"Error running command: {command}")
            print(f"Error: {result.stderr}")
            return False
        return True
    except Exception as e:
        print(f"Exception running command {command}: {e}")
        return False

def check_prerequisites():
    """Check if required software is installed"""
    print("🔍 Checking prerequisites...")
    
    # Check Python
    try:
        python_version = sys.version_info
        if python_version.major < 3 or (python_version.major == 3 and python_version.minor < 8):
            print("❌ Python 3.8+ is required")
            return False
        print(f"✅ Python {python_version.major}.{python_version.minor}.{python_version.micro}")
    except:
        print("❌ Python not found")
        return False
    
    # Check Node.js
    if not run_command("node --version"):
        print("❌ Node.js is required. Please install Node.js 18+")
        return False
    print("✅ Node.js found")
    
    # Check PostgreSQL
    if not run_command("psql --version"):
        print("⚠️  PostgreSQL not found. Please install PostgreSQL 12+")
        print("   The system will use SQLite for development")
    else:
        print("✅ PostgreSQL found")
    
    return True

def setup_backend():
    """Setup Django backend"""
    print("\n🔧 Setting up backend...")
    
    backend_dir = os.path.join(os.getcwd(), "backend")
    
    # Create virtual environment
    print("Creating virtual environment...")
    if platform.system() == "Windows":
        venv_command = "python -m venv venv"
        activate_command = "venv\\Scripts\\activate"
        pip_command = "venv\\Scripts\\pip"
        python_command = "venv\\Scripts\\python"
    else:
        venv_command = "python3 -m venv venv"
        activate_command = "source venv/bin/activate"
        pip_command = "venv/bin/pip"
        python_command = "venv/bin/python"
    
    if not run_command(venv_command, backend_dir):
        print("❌ Failed to create virtual environment")
        return False
    
    # Install Python dependencies
    print("Installing Python dependencies...")
    if not run_command(f"{pip_command} install -r requirements.txt", backend_dir):
        print("❌ Failed to install Python dependencies")
        return False
    
    # Setup database
    print("Setting up database...")
    
    # Create .env file if it doesn't exist
    env_file = os.path.join(backend_dir, ".env")
    if not os.path.exists(env_file):
        with open(env_file, "w") as f:
            f.write("""SECRET_KEY=django-insecure-development-key-change-in-production
DEBUG=True
DATABASE_URL=sqlite:///db.sqlite3
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
EMAIL_HOST_USER=
EMAIL_HOST_PASSWORD=
""")
        print("✅ Created .env file")
    
    # Run migrations
    if not run_command(f"{python_command} manage.py makemigrations", backend_dir):
        print("❌ Failed to create migrations")
        return False
    
    if not run_command(f"{python_command} manage.py migrate", backend_dir):
        print("❌ Failed to run migrations")
        return False
    
    # Create sample data
    print("Creating sample data...")
    if not run_command(f"{python_command} manage.py populate_sample_data", backend_dir):
        print("⚠️  Failed to create sample data (this is optional)")
    
    print("✅ Backend setup complete!")
    return True

def setup_frontend():
    """Setup Next.js frontend"""
    print("\n🎨 Setting up frontend...")
    
    frontend_dir = os.path.join(os.getcwd(), "frontend", "asaabe-frontend")
    
    # Install Node.js dependencies
    print("Installing Node.js dependencies...")
    if not run_command("npm install", frontend_dir):
        print("❌ Failed to install Node.js dependencies")
        return False
    
    # Create .env.local file if it doesn't exist
    env_file = os.path.join(frontend_dir, ".env.local")
    if not os.path.exists(env_file):
        with open(env_file, "w") as f:
            f.write("""NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
""")
        print("✅ Created .env.local file")
    
    print("✅ Frontend setup complete!")
    return True

def create_startup_scripts():
    """Create startup scripts for easy development"""
    print("\n📝 Creating startup scripts...")
    
    # Backend startup script
    if platform.system() == "Windows":
        backend_script = """@echo off
echo Starting ASAABE Hotel Backend...
cd backend
call venv\\Scripts\\activate
python manage.py runserver
pause
"""
        with open("start_backend.bat", "w") as f:
            f.write(backend_script)
        
        frontend_script = """@echo off
echo Starting ASAABE Hotel Frontend...
cd frontend\\asaabe-frontend
npm run dev
pause
"""
        with open("start_frontend.bat", "w") as f:
            f.write(frontend_script)
        
        print("✅ Created start_backend.bat and start_frontend.bat")
    else:
        backend_script = """#!/bin/bash
echo "Starting ASAABE Hotel Backend..."
cd backend
source venv/bin/activate
python manage.py runserver
"""
        with open("start_backend.sh", "w") as f:
            f.write(backend_script)
        os.chmod("start_backend.sh", 0o755)
        
        frontend_script = """#!/bin/bash
echo "Starting ASAABE Hotel Frontend..."
cd frontend/asaabe-frontend
npm run dev
"""
        with open("start_frontend.sh", "w") as f:
            f.write(frontend_script)
        os.chmod("start_frontend.sh", 0o755)
        
        print("✅ Created start_backend.sh and start_frontend.sh")

def main():
    """Main setup function"""
    print("🏨 ASAABE Hotel Management System Setup")
    print("=" * 50)
    
    if not check_prerequisites():
        print("\n❌ Prerequisites check failed. Please install required software.")
        sys.exit(1)
    
    if not setup_backend():
        print("\n❌ Backend setup failed.")
        sys.exit(1)
    
    if not setup_frontend():
        print("\n❌ Frontend setup failed.")
        sys.exit(1)
    
    create_startup_scripts()
    
    print("\n🎉 Setup completed successfully!")
    print("\n📋 Next steps:")
    print("1. Configure your Stripe keys in backend/.env and frontend/.env.local")
    print("2. Set up PostgreSQL database (optional, currently using SQLite)")
    print("3. Start the backend server:")
    if platform.system() == "Windows":
        print("   - Double-click start_backend.bat")
        print("4. Start the frontend server:")
        print("   - Double-click start_frontend.bat")
    else:
        print("   - ./start_backend.sh")
        print("4. Start the frontend server:")
        print("   - ./start_frontend.sh")
    
    print("\n🌐 Access the application:")
    print("   - Frontend: http://localhost:3000")
    print("   - Backend API: http://localhost:8000/api")
    print("   - Admin Panel: http://localhost:8000/admin")
    print("\n📧 Default admin credentials:")
    print("   - Email: admin@asaabe.com")
    print("   - Password: admin123")

if __name__ == "__main__":
    main()