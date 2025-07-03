# NASA Space Explorer

### Project Overview

The NASA Space Explorer is an interactive web application designed to bring the wonders of space closer to you. It serves as a dynamic portal to explore official NASA data and discover fascinating facts about the universe, making space education accessible and engaging. This project integrates directly with official NASA APIs for live data and leverages the advanced capabilities of the Gemini LLM for unique factual content, providing a rich and responsive user experience.

### Features

* **Astronomy Picture of the Day (APOD):** Browse NASA’s iconic Astronomy Picture of the Day by selecting specific dates or custom date ranges.
* **Mars Rover Photo Archive:** Explore a vast collection of photos captured by active Mars rovers (Curiosity, Opportunity, Spirit, Perseverance) filtered by Earth date.
* **Advanced Photo Filtering:** Refine your Mars rover photo search by selecting specific rover types and individual cameras.
* **Random Space Facts:** Discover intriguing and unique facts about various space topics, dynamically generated and powered by the cutting-edge Gemini LLM.
* **Responsive and Modern UI:** Enjoy a sleek, intuitive, and highly responsive user interface that adapts seamlessly across different devices.
* **Dark Mode Support:** Enhance your viewing experience with a comfortable dark mode option.
* **Real-time Data Integration:** Directly consumes data from official NASA APIs to ensure information is current and accurate.

### Technologies Used

* **Frontend:** React.js
* **Backend:** Node.js, Express.js
* **APIs:** NASA APIs (APOD, Mars Rover Photos), Google Gemini API

### Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

#### Prerequisites

* Node.js (LTS version recommended)
* npm (Node Package Manager)

#### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/ayodejimichaeladedeji/NASA-Space-Explorer.git](https://github.com/ayodejimichaeladedeji/NASA-Space-Explorer.git)
    cd NASA-Space-Explorer
    ```

2.  **Install Frontend Dependencies:**
    ```bash
    cd frontend
    npm install
    ```

3.  **Install Backend Dependencies:**
    ```bash
    cd ../backend
    npm install
    ```

#### Configuration - BACKEND
Create a `.env` file in the `backend` directory and add the following environment variables. Replace the placeholder values with your actual API keys and other configurations:

```env
GEMINI_API_KEY=YOUR_GOOGLE_GEMINI_API_KEY
NASA_API_KEY=YOUR_NASA_API_KEY
REDIS_URL=YOUR_REDIS_URL
PORT=YOUR_PORT_NUMBER
NASA_BASE_API=https://api.nasa.gov
NODE_ENV=development
GEMINI_MODEL=gemini-2.0-flash

THE GEMINI MODEL CAN BE CONFIGURED TO USE ANY MODEL OF YOUR CHOICE

#### Configuration - FRONTEND

```env
Create a `.env` file in the `frontend` directory and add the following environment variables. Replace the placeholder values with your actual API keys and other configurations:
VITE_API_BASE_URL=URL_AND_PORT_WHERE_YOUR_BACKEND_IS_RUNNING_ON
