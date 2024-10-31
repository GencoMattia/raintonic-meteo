# 🌤️ Raintonic Meteo - Your Personalized Weather Dashboard 🌦️

**Raintonic Meteo** is a dynamic weather application providing real-time weather data, interactive charts, and the ability to save and manage your favorite locations. With an intuitive design and detailed information, Raintonic Meteo helps you stay updated on weather conditions wherever you are or plan to go!

---

## 🖥️ Features

- **City Search with Autocomplete**: Enter a city name to get quick suggestions based on your input.
- **Detailed Weather Data**: Access real-time information like temperature, humidity, atmospheric conditions, and wind speed.
- **Hourly Temperature Chart**: View the temperature trend for the next 24 hours.
- **Favorite Locations Management**: Save your favorite locations, view their weather data, and manage them with a simple click.
- **Data Sorting**: Sort cities by temperature in ascending or descending order and restore the default order easily.

---

## 🚀 Getting Started

1. **Clone this repository**:
    ```bash
    git clone https://github.com/your-username/raintonic-meteo.git
    cd raintonic-meteo
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Run the application**:
    ```bash
    npm run serve
    ```

4. Open your browser and go to `http://localhost:8080` to view the app.

---

## 📚 Usage Guide

1. **Search for a City**: 
   - Start typing the name of a city in the search bar to see available suggestions.

2. **View and Select Weather Data**:
   - Select a city to load its current conditions and forecast for the next 24 hours.

3. **Manage Favorite Locations**:
   - Click "Favorite" to save or remove a city from your favorites list.
   - View your saved cities in the Favorites section and sort them by temperature with a single click.

---

## 🛠️ Technologies and Libraries Used

- **Vue.js**: Frontend framework for creating interactive and responsive user interfaces.
- **Vue Chart.js**: For creating interactive charts of temperature trends.
- **Axios**: For HTTP requests to fetch weather data.
- **Bootstrap**: Provides a responsive style to create a clean, modern interface.
- **FontAwesome**: Weather icons that adapt to atmospheric conditions.
- **GitHub Pages**: Used to deploy the app.
- **Open Meteo API**: Primary source for weather and geolocation data.

---

## 🔗 API Reference

- **Geolocation API**: [https://geocoding-api.open-meteo.com](https://geocoding-api.open-meteo.com)
- **Weather Forecast API**: [https://api.open-meteo.com](https://api.open-meteo.com)

---

## 📦 Project Structure

The project follows a modular structure to keep components, assets, and services organized:

- **`src/components`**: Vue components, including main UI elements like `WeatherCard.vue` and `CitySearch.vue`.
- **`src/views`**: Main views of the application, such as the homepage and favorites page.
- **`src/services`**: Contains API service files that manage data requests and responses.
- **`src/assets`**: Styles, images, and other static assets.

---

## 🌐 Deployment

The application is hosted on **GitHub Pages** for easy access and sharing. For deployment:

1. Push your code to the `main` branch.
2. In the repository settings, enable GitHub Pages and set the branch to `main` or `gh-pages`.
3. Your app will be available at `https://your-username.github.io/raintonic-meteo`.

---

## 🛠️ How to Contribute

1. **Fork the repository** and create your branch from `main`.
2. **Make your changes**: Ensure your code is properly formatted and tested.
3. **Commit your changes** with clear and descriptive messages.
4. **Push to the branch** and open a **Pull Request**.

---

## ⚖️ License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 👤 Author

Developed by Mattia Genco as part of a job application project. For inquiries, feel free to contact via [gencomattia@hotmail.it](mailto:gencomattia@hotmail.it).

---

Thank you for using **Raintonic Meteo**! We hope it becomes your go-to app for real-time, reliable weather updates. Enjoy exploring!
