import React, { useState, useEffect } from 'react'
import { MapPin, Navigation, Clock, AlertTriangle, Users } from 'lucide-react'

const SimpleMap = ({ alerts = [], volunteers = [], helpRequests = [] }) => {
  const [userLocation, setUserLocation] = useState(null)
  const [locationError, setLocationError] = useState(null)

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        (error) => {
          setLocationError(error.message)
          console.error("Error getting location:", error)
        }
      )
    } else {
      setLocationError("Geolocation is not supported by this browser.")
    }
  }, [])

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371 // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLon = (lon2 - lon1) * Math.PI / 180
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return R * c // Distance in kilometers
  }

  const getLocationInfo = () => {
    if (!userLocation) return { text: "Getting location...", style: "text-gray-500" }
    
    // Default to Hyderabad center if no user location
    const currentLat = userLocation.lat
    const currentLng = userLocation.lng
    
    // Check if in Hyderabad area (rough bounds)
    const inHyderabad = currentLat > 17.2 && currentLat < 17.6 && currentLng > 78.2 && currentLng < 78.7
    
    if (inHyderabad) {
      return { 
        text: `Your location: Hyderabad (${currentLat.toFixed(3)}, ${currentLng.toFixed(3)})`, 
        style: "text-success-600" 
      }
    } else {
      return { 
        text: `Location: ${currentLat.toFixed(3)}, ${currentLng.toFixed(3)} (Outside affected area)`, 
        style: "text-warning-600" 
      }
    }
  }

  const nearbyItems = userLocation ? [
    ...alerts.map(alert => ({
      ...alert,
      type: 'alert',
      distance: calculateDistance(userLocation.lat, userLocation.lng, alert.lat, alert.lng)
    })),
    ...volunteers.map(volunteer => ({
      ...volunteer,
      type: 'volunteer',
      distance: calculateDistance(userLocation.lat, userLocation.lng, volunteer.lat, volunteer.lng)
    })),
    ...helpRequests.map(request => ({
      ...request,
      type: 'help_request',
      distance: calculateDistance(userLocation.lat, userLocation.lng, request.lat, request.lng)
    }))
  ].sort((a, b) => a.distance - b.distance).slice(0, 8) : []

  const locationInfo = getLocationInfo()

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
        <MapPin className="h-5 w-5 mr-2" />
        Location & Nearby Resources
      </h3>
      
      {/* Location Status */}
      <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Navigation className="h-5 w-5 mr-2 text-primary-500" />
            <span className={`font-medium ${locationInfo.style}`}>
              {locationInfo.text}
            </span>
          </div>
          {locationError && (
            <span className="text-sm text-emergency-500">
              Location unavailable
            </span>
          )}
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="mb-6 h-64 bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center">
        <div className="text-center">
          <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500 dark:text-gray-400 font-medium">Interactive Map</p>
          <p className="text-sm text-gray-400 dark:text-gray-500">Real-time emergency response locations</p>
        </div>
      </div>

      {/* Nearby Items */}
      {userLocation && nearbyItems.length > 0 && (
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            Nearby ({nearbyItems.length} items)
          </h4>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {nearbyItems.map((item, index) => (
              <div key={`${item.type}-${item.id}`} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex items-center flex-1">
                  {item.type === 'alert' && <AlertTriangle className="h-4 w-4 text-emergency-500 mr-3 flex-shrink-0" />}
                  {item.type === 'volunteer' && <Users className="h-4 w-4 text-primary-500 mr-3 flex-shrink-0" />}
                  {item.type === 'help_request' && <MapPin className="h-4 w-4 text-warning-500 mr-3 flex-shrink-0" />}
                  
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 dark:text-white text-sm truncate">
                      {item.title || item.name}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                      {item.location} • {item.distance?.toFixed(1)}km away
                    </p>
                    {item.type === 'volunteer' && (
                      <p className="text-xs text-success-600 dark:text-success-400">
                        {item.availability}
                      </p>
                    )}
                    {item.type === 'alert' && (
                      <span className={`inline-block text-xs px-2 py-0.5 rounded-full ${
                        item.severity === 'critical' 
                          ? 'bg-emergency-100 text-emergency-800' 
                          : 'bg-warning-100 text-warning-800'
                      }`}>
                        {item.severity}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {(!userLocation && !locationError) && (
        <div className="text-center text-gray-500 dark:text-gray-400 py-4">
          <Navigation className="h-8 w-8 animate-pulse mx-auto mb-2" />
          <p>Getting your location for nearby resources...</p>
        </div>
      )}
    </div>
  )
}

export default SimpleMap