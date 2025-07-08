import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="text-center">
          <h1 className="display-4 mb-4">Welcome to PERN User Management</h1>
          <p className="lead mb-4">
            A full-stack application built with PostgreSQL, Express, React, and Node.js
          </p>
          
          {isAuthenticated ? (
            <div>
              <div className="alert alert-success" role="alert">
                <h4 className="alert-heading">Hello, {user?.name}!</h4>
                <p>You are successfully logged in. You can now access your profile and manage your account.</p>
                <hr />
                <Link to="/profile" className="btn btn-success">
                  Go to Profile
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <div className="alert alert-info" role="alert">
                <h4 className="alert-heading">Get Started</h4>
                <p>Create an account or log in to access all features of the application.</p>
                <hr />
                <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                  <Link to="/register" className="btn btn-primary me-md-2">
                    Create Account
                  </Link>
                  <Link to="/login" className="btn btn-outline-primary">
                    Login
                  </Link>
                </div>
              </div>
            </div>
          )}
          
          <div className="row mt-5">
            <div className="col-md-4">
              <div className="card h-100">
                <div className="card-body text-center">
                  <h5 className="card-title">🔐 Secure Authentication</h5>
                  <p className="card-text">JWT-based authentication with bcrypt password hashing</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100">
                <div className="card-body text-center">
                  <h5 className="card-title">👤 Profile Management</h5>
                  <p className="card-text">View and update your profile information securely</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100">
                <div className="card-body text-center">
                  <h5 className="card-title">🛡️ Protected Routes</h5>
                  <p className="card-text">Route protection ensures only authenticated users can access sensitive pages</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;