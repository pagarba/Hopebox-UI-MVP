
export default {
  // Alert
  ALERT: {
    CREATE: 'action.alert.create',
    DELETE: 'action.alert.delete',
  },
  // Data
  DATA: 'action.data',
  // Modal
  MODAL: {
    BTS: 'action.modal.bts',
    HAZARD: 'action.modal.hazard',
    LOCATION: 'action.modal.location',
    RESPONDER: 'action.modal.responder',
    USER: 'action.modal.user',
    VEHICLE: 'action.modal.vehicle',
  },
  // BTS
  BTS: {
    CREATE: 'action.bts.create',
    DELETE: 'action.bts.delete',
    FREQUENCIES: [800, 900, 1800, 1900],
    UPDATE: 'action.bts.update',
  },
  BTSS: 'action.bts.all',
  // CC
  CC: {
    DISTANCES: ['km', 'm'],
    LANGUAGES: ['en_US'],
    SET: 'action.cc',
  },
  // Demo
  DEMO: 'action.demo',
  // Hazard
  HAZARD: {
    CREATE: 'action.hazard.create',
    DELETE: 'action.hazard.delete',
    UPDATE: 'action.hazard.update',
  },
  // Keys
  KEY: {
    CC: '@hopebox-cc',
    CLICK: '@hopebox-click-geolocation',
  },
  // Location
  LOCATION: {
    CREATE: 'action.location.create',
    DELETE: 'action.location.delete',
    UPDATE: 'action.location.update',
  },
  LOCATIONS: 'action.location.all',
  // Map
  MAP: {
    COLOR: {
      BTS: 'rgba(0, 0, 255, 0.25)',
      CC: 'blue',
    },
    MARKER: {
      BTS: 'img/marker/mobilephonetower.png',
      CC: 'img/marker/database.png',
      HAZARD: {
        FIRE: 'img/marker/fire.png',
        FLOOD: 'img/marker/flood.png',
        HAZMAT: 'img/marker/radiation.png',
        GAS: 'img/marker/gas_cylinder1.png',
        UNSAFE: 'img/marker/accesdenied.png',
        FALLEN: 'img/marker/fallingrocks.png',
        PEOPLE: 'img/marker/family.png',
      },
      LOCATION: {
        SAFE: 'img/marker/flag-export.png',
        MEDICAL: 'img/marker/firstaid.png', // medicine.png
        FOOD: 'img/marker/apple.png',
        WATER: 'img/marker/waterdrop.png',
        POLICE: 'img/marker/police.png',
        MILITARY: 'img/marker/military.png',
      },
      RESPONDER: 'img/marker/rescue-2.png',
      UNKNOWN: 'img/marker/alien.png',
      USER: 'img/marker/number_{n}.png',
      VEHICLE: {
        BUS: 'img/marker/bus.png',
        MEDICAL: 'img/marker/ambulance.png',
        FOOD: 'img/marker/foodcan.png',
        FIRE: 'img/marker/firemen.png',
        POLICE: 'img/marker/army.png',
        AERIAL: 'img/marker/helicopter.png',
      },
    },
    OFFSET: 0.0774321,
    POSITION: [34.052235, -118.243683],
    TILE_SERVERS: [
      {name: 'Carto Light', url: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png'},
      {name: 'Carto Dark', url: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png'},
      {name: 'Esri World Imagery', url: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'},
      {name: 'OpenStreetMap Standard', url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'},
      {checked: true, name: 'OpenStreetMap Humanitarium', url: 'http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'},
      {name: 'OpenTopoMap', url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'},
      {name: 'Stamen Toner', url: 'http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png'},
      {name: 'Thunderforest Transport', url: 'http://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png'},
      {name: 'Thunderforest Landscape', url: 'http://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png'},
      {name: 'WMFLabs Black and White', url: 'https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png'},
      {name: 'WMFLabs Hike and Bike', url: 'https://tiles.wmflabs.org/hikebike/{z}/{x}/{y}.png'},
      {name: 'WMFLabs Hill Shading', url: 'http://tiles.wmflabs.org/hillshading/{z}/{x}/{y}.png'},
    ],
  },
  // Mobile
  MOBILE: {
    ICON: {
      APPS: 'apps',
      BATTERY: 'battery_full',
      BROWSER: 'open_in_browser',
      CAMERA: 'camera',
      CELL: {
        OFF: 'signal_cellular_off',
        ON: 'signal_cellular_4_bar',
      },
      PHONE: 'phone',
      SMS: 'textsms',
      WIFI: {
        OFF: 'wifi_off',
        ON: 'wifi',
      },
    },
  },
  // Responder
  RESPONDER: {
    CREATE: 'action.responder.create',
    DELETE: 'action.responder.delete',
    UPDATE: 'action.responder.update',
  },
  RESPONDERS: 'action.responder.all',
  // Splash
  SPLASH: 3000,
  // Startup
  STARTUP: 'action.startup',
  // User
  USER: {
    CREATE: 'action.user.create',
    UPDATE: 'action.user.update',
  },
  USERS: 'action.user.all',
  // Vehicle
  VEHICLE: {
    CREATE: 'action.vehicle.create',
    DELETE: 'action.vehicle.delete',
    UPDATE: 'action.vehicle.update',
  },
  VEHICLES: 'action.vehicle.all',
}
