// app/page.tsx

'use client';

import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Icon } from '@iconify/react';
import Link from 'next/link';

export default function HomePage() {
  const { user, initializeUser, isAuthenticated } = useAuth();

  useEffect(() => {
    // Only initialize if we have a refresh token
    const authStorage = localStorage.getItem('auth-storage');
    if (authStorage) {
      try {
        const parsed = JSON.parse(authStorage);
        if (parsed.state?.refreshToken) {
          initializeUser();
        }
      } catch (error) {
        console.log('Failed to parse auth storage');
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Icon icon="mdi:home" className="text-blue-600" width={32} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  {user ? `سلام، ${user.full_name || 'کاربر گرامی'}!` : 'خوش آمدید!'}
                </h1>
                <p className="text-gray-600">
                  {user
                    ? 'به پنل کاربری خود خوش آمدید'
                    : 'لطفا وارد حساب کاربری خود شوید'}
                </p>
              </div>
            </div>

            {user && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <Icon
                      icon="mdi:phone"
                      className="text-blue-600"
                      width={24}
                    />
                    <div>
                      <p className="text-sm text-gray-600">شماره موبایل</p>
                      <p className="font-medium text-gray-800">
                        {user.phone_number}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <Icon
                      icon="mdi:shield-check"
                      className="text-green-600"
                      width={24}
                    />
                    <div>
                      <p className="text-sm text-gray-600">وضعیت حساب</p>
                      <p className="font-medium text-gray-800">
                        {user.profile_completed ? 'تکمیل شده' : 'ناقص'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Icon
                  icon="mdi:account"
                  className="text-purple-600"
                  width={24}
                />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                مدیریت پروفایل
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                اطلاعات شخصی خود را مدیریت کنید
              </p>
              {user ? (
                <Link
                  href="/profile"
                  className="text-blue-600 hover:underline text-sm font-medium"
                >
                  مشاهده پروفایل →
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="text-blue-600 hover:underline text-sm font-medium"
                >
                  ورود به حساب →
                </Link>
              )}
            </div>

            <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Icon
                  icon="mdi:security"
                  className="text-orange-600"
                  width={24}
                />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                امنیت بالا
              </h3>
              <p className="text-gray-600 text-sm">
                احراز هویت دو مرحله‌ای با JWT
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Icon icon="mdi:message" className="text-green-600" width={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                ورود با پیامک
              </h3>
              <p className="text-gray-600 text-sm">
                ورود سریع و آسان با کد تایید
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}