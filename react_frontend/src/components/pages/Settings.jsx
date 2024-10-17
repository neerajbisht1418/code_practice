import React, { useState } from 'react';
import Layout from '../layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Bell, Lock, User, Globe, Moon, Sun } from 'lucide-react';

const ToggleSwitch = ({ enabled, setEnabled }) => (
  <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
    <input
      type="checkbox"
      name="toggle"
      id="toggle"
      className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
      checked={enabled}
      onChange={() => setEnabled(!enabled)}
    />
    <label
      htmlFor="toggle"
      className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${
        enabled ? 'bg-blue-500' : 'bg-gray-300'
      }`}
    ></label>
  </div>
);

const SettingsCard = ({ title, icon: Icon, children }) => (
  <Card className="mb-6">
    <CardHeader className="flex flex-row items-center space-x-2">
      <Icon className="h-6 w-6 text-gray-500" />
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <div className="max-w-2xl mx-auto">
        <SettingsCard title="Account" icon={User}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                placeholder="johndoe"
              />
            </div>
          </div>
        </SettingsCard>

        <SettingsCard title="Appearance" icon={darkMode ? Moon : Sun}>
          <div className="flex items-center justify-between">
            <span>Dark Mode</span>
            <ToggleSwitch enabled={darkMode} setEnabled={setDarkMode} />
          </div>
        </SettingsCard>

        <SettingsCard title="Notifications" icon={Bell}>
          <div className="flex items-center justify-between">
            <span>Enable Notifications</span>
            <ToggleSwitch enabled={notifications} setEnabled={setNotifications} />
          </div>
        </SettingsCard>

        <SettingsCard title="Security" icon={Lock}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Two-Factor Authentication</span>
              <ToggleSwitch enabled={twoFactor} setEnabled={setTwoFactor} />
            </div>
            <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
              Change Password
            </button>
          </div>
        </SettingsCard>

        <SettingsCard title="Language" icon={Globe}>
          <select className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
            <option>German</option>
          </select>
        </SettingsCard>
      </div>
    </Layout>
  );
};

export default Settings;