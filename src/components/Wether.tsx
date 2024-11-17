'use client'

import React, { useState } from 'react'
import { Search, Cloud, Sun, CloudRain } from 'lucide-react'

interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{
    description: string;
  }>;
  wind: {
    speed: number;
  };
}

export default function Weather(): JSX.Element {
  const [city, setCity] = useState<string>('')
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const uzbekCities: string[] = [
    'toshkent', 'samarqand', 'buxoro', 'andijon', 'namangan', 'fargona',
    'qarshi', 'nukus', 'xiva', 'termiz', 'jizzax', 'guliston'
  ]

  const getRandomWeather = (city: string): WeatherData => {
    const descriptions: string[] = ['Quyoshli', 'Bulutli', 'Yomg\'irli']
    const description: string = descriptions[Math.floor(Math.random() * descriptions.length)]
    const temp: number = Math.floor(Math.random() * (35 - 10 + 1)) + 10 
    const humidity: number = Math.floor(Math.random() * (80 - 30 + 1)) + 30  
    const windSpeed: number = Math.floor(Math.random() * 10) + 1 

    return {
      name: city,
      main: { temp, humidity },
      weather: [{ description }],
      wind: { speed: windSpeed }
    }
  }

  const fetchWeather = (): void => {
    if (!uzbekCities.includes(city)) {
      setError("Aka iltimos brornima yozib keyin btn ni bosing")
      return
    }

    setLoading(true)
    setError('')

    setTimeout(() => {
      const weatherData: WeatherData = getRandomWeather(city)
      setWeather(weatherData)
      setLoading(false)
    }, 1000)
  }

  const getWeatherIcon = (description: string): JSX.Element => {
    switch (description.toLowerCase()) {
      case 'quyoshli':
        return <Sun className="h-10 w-10 text-yellow-400" />
      case 'bulutli':
        return <Cloud className="h-10 w-10 text-gray-400" />
      case 'yomg\'irli':
        return <CloudRain className="h-10 w-10 text-blue-400" />
      default:
        return <Cloud className="h-10 w-10 text-gray-400" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          O'zbekiston Ob-havosini Bilish
        </h2>
        <div className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Viloyat nomini kiriting"
                value={city}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCity(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button
              onClick={fetchWeather}
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loading ? (
                'Yuklanmoqda...'
              ) : (
                <>
                  <Search className="h-5 w-5 text-indigo-300 group-hover:text-indigo-400 mr-2" aria-hidden="true" />
                  Ob-havo ma'lumotlarini ko`ring
                </>
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4 mt-4">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        )}

        {weather && (
          <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {weather.name} ob-havo ma'lumotlari
              </h3>
              {getWeatherIcon(weather.weather[0].description)}
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Harorat</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {weather.main.temp}°C
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Tavsif</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {weather.weather[0].description}
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Namlik</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {weather.main.humidity}%
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Shamol tezligi</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {weather.wind.speed} m/s
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}