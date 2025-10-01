#!/usr/bin/env python3
"""
Backend API Testing for Siete CX Landing Page
Tests the FastAPI backend endpoints for basic functionality
"""

import requests
import json
import os
from datetime import datetime

# Get backend URL from frontend .env file
def get_backend_url():
    try:
        with open('/app/frontend/.env', 'r') as f:
            for line in f:
                if line.startswith('VITE_BACKEND_URL='):
                    return line.split('=', 1)[1].strip()
    except FileNotFoundError:
        pass
    return "http://localhost:8001"

BACKEND_URL = get_backend_url()
API_BASE_URL = f"{BACKEND_URL}/api"

def test_backend_health():
    """Test basic backend connectivity and health"""
    print("🔍 Testing Backend Health...")
    try:
        response = requests.get(f"{API_BASE_URL}/", timeout=10)
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Backend Health Check PASSED: {data}")
            return True
        else:
            print(f"❌ Backend Health Check FAILED: Status {response.status_code}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"❌ Backend Health Check FAILED: Connection error - {e}")
        return False

def test_status_check_creation():
    """Test creating a status check entry"""
    print("\n🔍 Testing Status Check Creation...")
    try:
        test_data = {
            "client_name": "Siete CX Test Client"
        }
        
        response = requests.post(
            f"{API_BASE_URL}/status",
            json=test_data,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Status Check Creation PASSED")
            print(f"   Created ID: {data.get('id')}")
            print(f"   Client Name: {data.get('client_name')}")
            print(f"   Timestamp: {data.get('timestamp')}")
            return True, data.get('id')
        else:
            print(f"❌ Status Check Creation FAILED: Status {response.status_code}")
            print(f"   Response: {response.text}")
            return False, None
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Status Check Creation FAILED: Connection error - {e}")
        return False, None

def test_status_check_retrieval():
    """Test retrieving status check entries"""
    print("\n🔍 Testing Status Check Retrieval...")
    try:
        response = requests.get(f"{API_BASE_URL}/status", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Status Check Retrieval PASSED")
            print(f"   Retrieved {len(data)} status check(s)")
            if data:
                print(f"   Latest entry: {data[-1].get('client_name')} at {data[-1].get('timestamp')}")
            return True
        else:
            print(f"❌ Status Check Retrieval FAILED: Status {response.status_code}")
            print(f"   Response: {response.text}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Status Check Retrieval FAILED: Connection error - {e}")
        return False

def test_cors_headers():
    """Test CORS configuration"""
    print("\n🔍 Testing CORS Configuration...")
    try:
        response = requests.options(f"{API_BASE_URL}/", timeout=10)
        headers = response.headers
        
        cors_headers = {
            'Access-Control-Allow-Origin': headers.get('Access-Control-Allow-Origin'),
            'Access-Control-Allow-Methods': headers.get('Access-Control-Allow-Methods'),
            'Access-Control-Allow-Headers': headers.get('Access-Control-Allow-Headers')
        }
        
        print(f"✅ CORS Headers Retrieved:")
        for header, value in cors_headers.items():
            print(f"   {header}: {value}")
        
        return True
        
    except requests.exceptions.RequestException as e:
        print(f"❌ CORS Test FAILED: Connection error - {e}")
        return False

def run_backend_tests():
    """Run all backend tests"""
    print("=" * 60)
    print("🚀 SIETE CX BACKEND API TESTING")
    print("=" * 60)
    print(f"Backend URL: {BACKEND_URL}")
    print(f"API Base URL: {API_BASE_URL}")
    print("=" * 60)
    
    results = {
        'health_check': False,
        'status_creation': False,
        'status_retrieval': False,
        'cors_config': False
    }
    
    # Test backend health
    results['health_check'] = test_backend_health()
    
    # Test status check creation
    results['status_creation'], created_id = test_status_check_creation()
    
    # Test status check retrieval
    results['status_retrieval'] = test_status_check_retrieval()
    
    # Test CORS configuration
    results['cors_config'] = test_cors_headers()
    
    # Summary
    print("\n" + "=" * 60)
    print("📊 BACKEND TEST RESULTS SUMMARY")
    print("=" * 60)
    
    passed_tests = sum(results.values())
    total_tests = len(results)
    
    for test_name, passed in results.items():
        status = "✅ PASSED" if passed else "❌ FAILED"
        print(f"{test_name.replace('_', ' ').title()}: {status}")
    
    print(f"\nOverall Result: {passed_tests}/{total_tests} tests passed")
    
    if passed_tests == total_tests:
        print("🎉 ALL BACKEND TESTS PASSED - API is fully functional!")
        return True
    else:
        print("⚠️  SOME BACKEND TESTS FAILED - Check logs above for details")
        return False

if __name__ == "__main__":
    success = run_backend_tests()
    exit(0 if success else 1)