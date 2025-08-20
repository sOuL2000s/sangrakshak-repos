# 🛡️ SangrakshakX 2.0 SS

**SangrakshakX 2.0 SS** is a next-generation Smart Surveillance and Safety system designed for high-risk zones, combining real-time monitoring, sensor fusion, and intelligent alerting. Built with modular IoT architecture and a refined frontend, it empowers users with actionable insights and seamless control.

## 🚀 Core Features

- 🎥 **Live Surveillance Feed** with motion detection and anomaly tracking
- 🌐 **ESP32-Based Sensor Grid** for intrusion, gas, and temperature monitoring
- 📊 **ML-Powered Threat Analytics** via Streamlit dashboard
- 🧭 **Zone-Wise Control Panel** with responsive UI and real-time status
- 🔔 **Multi-Channel Alert System** (SMS, email, dashboard)
- 🧱 **Scalable Architecture** for easy zone/sensor expansion

## 🧩 Tech Stack

### Frontend  
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![ShadCN UI](https://img.shields.io/badge/ShadCN_UI-000000?style=for-the-badge&logo=vercel&logoColor=white)

### Backend  
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MQTT](https://img.shields.io/badge/MQTT-FF9800?style=for-the-badge&logo=eclipse-mosquitto&logoColor=white)

### IoT & Firmware  
![ESP32](https://img.shields.io/badge/ESP32-FFDD00?style=for-the-badge&logo=espressif&logoColor=black)
![MicroPython](https://img.shields.io/badge/MicroPython-FFD43B?style=for-the-badge&logo=python&logoColor=black)

### ML & Analytics  
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Streamlit](https://img.shields.io/badge/Streamlit-FF4B4B?style=for-the-badge&logo=streamlit&logoColor=white)
![Scikit-learn](https://img.shields.io/badge/Scikit--learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white)

### Database  
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

### Deployment  
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Heroku](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white)

## 📐 System Architecture

- **Sensor Nodes**: ESP32 units with modular sensor attachments
- **Gateway**: MQTT broker for real-time data relay
- **Dashboard**: Web interface for zone-wise monitoring and control
- **Alert Engine**: Rule-based + ML-enhanced alerting logic

## 🧪 Setup Instructions

1. Clone the repo:
   ```bash
   git clone https://github.com/debarghya17/sangrakshak.git
   ```
2. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
3. Configure backend and MQTT settings in `.env`
4. Flash ESP32 with firmware from `/iot/firmware`

## 📸 Screenshots & Demo

Coming soon:
- Dashboard walkthrough
- Sensor data simulation
- Alert trigger showcase

## 👨‍💻 Contributors

- **Debarghya Bhowmick** — Founder, Architect and Lead Developer  
- 

## 📜 License

This project is released under a Proprietary License. Redistribution, modification or commercial use is strictly prohibited without prior written consent from the author. All rights reserved © Debarghya Bhowmick.
