import React, { useState } from "react";

const App = () => {
  const [hourlyRate, setHourlyRate] = useState("");
  const [hoursWorked, setHoursWorked] = useState("");
  const [lossPremium, setLossPremium] = useState("");
  const [results, setResults] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [inputFocus, setInputFocus] = useState(null);

  const calculate = () => {
    setIsCalculating(true);
    setTimeout(() => {
      const hr = parseFloat(hourlyRate) || 0;
      const hw = parseFloat(hoursWorked) || 0;
      const lp = parseFloat(lossPremium) || 0;
      const priropatokPercent = 0.1;
      const premia50 = 0.5;
      const premia45 = 0.45;
      const safetyPercent = 0.2;
      const rcPercent = 0.15;
      const taxPercent = 0.13;

      // С приработком
      const tariff = hr * hw;
      const priropatok = tariff * priropatokPercent;
      const baseForPremia = tariff + priropatok;
      const prem50 = baseForPremia * premia50;
      const prem45 = baseForPremia * premia45;
      const safety = tariff * safetyPercent;
      const baseForRc = tariff + priropatok + prem50 + prem45 + safety + lp;
      const rc = baseForRc * rcPercent;
      const gross = baseForRc + rc;
      const tax = gross * taxPercent;
      const net = gross - tax;

      // Без приработока
      const prem50Without = tariff * premia50;
      const prem45Without = tariff * premia45;
      const safetyWithout = tariff * safetyPercent;
      const baseForRcWithout =
        tariff + prem50Without + prem45Without + safetyWithout + lp;
      const rcWithout = baseForRcWithout * rcPercent;
      const grossWithout = baseForRcWithout + rcWithout;
      const taxWithout = grossWithout * taxPercent;
      const netWithout = grossWithout - taxWithout;

      setResults({
        with: {
          gross: gross.toFixed(2),
          tax: tax.toFixed(2),
          net: net.toFixed(2),
        },
        without: {
          gross: grossWithout.toFixed(2),
          tax: taxWithout.toFixed(2),
          net: netWithout.toFixed(2),
        },
      });
      setIsCalculating(false);
    }, 1000);
  };

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-gray-800"
      } relative overflow-hidden`}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-64 -right-64 w-96 h-96 bg-gradient-to-br from-indigo-400/30 to-pink-400/30 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-80 -left-80 w-96 h-96 bg-gradient-to-tr from-red-400/30 to-yellow-400/30 rounded-full filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-gradient-to-bl from-green-400/20 to-teal-400/20 rounded-full filter blur-3xl opacity-30 animate-ping"></div>
      </div>

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-white mix-blend-overlay"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float ${
              5 + Math.random() * 5
            }s ease-in-out infinite alternate`,
          }}
        />
      ))}

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          100% {
            transform: translateY(-20px);
          }
        }
      `}</style>

      <div className="container mx-auto px-4 py-12 relative z-10 max-w-xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 drop-shadow-lg">
            Калькулятор зарплаты
          </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-yellow-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Card Container */}
        <div
          className={`rounded-3xl shadow-2xl backdrop-blur-sm border overflow-hidden transition-all duration-500 ${
            darkMode
              ? "bg-gray-800/90 border-gray-700 shadow-gray-900/20"
              : "bg-white/90 border-gray-100 shadow-purple-200/50"
          }`}
        >
          {/* Top Gradient Strip */}
          <div
            className={`px-6 py-5 ${
              darkMode
                ? "bg-gradient-to-r from-indigo-900 to-purple-900"
                : "bg-gradient-to-r from-blue-600 to-indigo-600"
            } text-white shadow-lg`}
          >
            <h2 className="text-xl font-bold">Рассчитайте вашу зарплату</h2>
            <p className="text-xs opacity-90 mt-1">
              Введите данные ниже для мгновенного расчёта
            </p>
          </div>

          {/* Inputs */}
          <div className="p-6 space-y-6">
            {[
              {
                id: "hourlyRate",
                label: "Тарифная ставка (₽/ч)",
                value: hourlyRate,
                setValue: setHourlyRate,
                placeholder: "Например, 154.70",
              },
              {
                id: "hoursWorked",
                label: "Отработано часов",
                value: hoursWorked,
                setValue: setHoursWorked,
                placeholder: "Например, 151",
              },
              {
                id: "lossPremium",
                label: "Премия за потери (₽)",
                value: lossPremium,
                setValue: setLossPremium,
                placeholder: "Например, 424.29",
              },
            ].map((field, index) => (
              <div key={field.id} className="space-y-2 group">
                <label
                  htmlFor={field.id}
                  className="block text-sm font-medium opacity-80 group-hover:opacity-100 transition-opacity"
                >
                  {field.label}
                </label>
                <input
                  id={field.id}
                  type="number"
                  step="0.01"
                  value={field.value}
                  onChange={(e) => field.setValue(e.target.value)}
                  onFocus={() => setInputFocus(field.id)}
                  onBlur={() => setInputFocus(null)}
                  placeholder={field.placeholder}
                  className={`w-full px-4 py-3 rounded-xl border focus:ring-4 focus:outline-none transition-all duration-300 ${
                    inputFocus === field.id
                      ? darkMode
                        ? "border-blue-500 ring-blue-500/30"
                        : "border-blue-400 ring-blue-400/30"
                      : ""
                  } ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 focus:ring-blue-500/50"
                      : "bg-gray-50 border-gray-300 focus:ring-blue-500/50"
                  }`}
                />
              </div>
            ))}

            {/* Calculate Button */}
            <button
              onClick={calculate}
              disabled={isCalculating}
              className={`mt-2 w-full py-3 px-4 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-500/50 shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                isCalculating ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isCalculating ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Рассчитываем...
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Рассчитать
                </>
              )}
            </button>
          </div>

          {/* Results */}
          {results && (
            <div
              className={`result-section p-6 border-t transition-all duration-500 ${
                darkMode
                  ? "bg-gray-800/70 border-gray-700"
                  : "bg-white/70 border-gray-200"
              }`}
            >
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="inline-block w-2 h-6 rounded-full bg-gradient-to-b from-blue-500 to-purple-600"></span>
                Результаты расчёта
              </h2>
              <div className="space-y-5">
                <div
                  className={`p-5 rounded-xl border shadow-md transition-all duration-300 transform hover:scale-102 ${
                    darkMode
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <h3 className="font-semibold text-lg text-blue-600 dark:text-blue-400 mb-3">
                    С приработком:
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span>Грязными:</span>
                      <span className="font-medium">
                        {results.with.gross} ₽
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>НДФЛ (13%):</span>
                      <span className="font-medium">{results.with.tax} ₽</span>
                    </li>
                    <li className="flex justify-between">
                      <span>На руки:</span>
                      <span className="font-medium text-green-600 dark:text-green-400">
                        {results.with.net} ₽
                      </span>
                    </li>
                  </ul>
                </div>
                <div
                  className={`p-5 rounded-xl border shadow-md transition-all duration-300 transform hover:scale-102 ${
                    darkMode
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <h3 className="font-semibold text-lg text-blue-600 dark:text-blue-400 mb-3">
                    Без приработока:
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span>Грязными:</span>
                      <span className="font-medium">
                        {results.without.gross} ₽
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>НДФЛ (13%):</span>
                      <span className="font-medium">
                        {results.without.tax} ₽
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>На руки:</span>
                      <span className="font-medium text-green-600 dark:text-green-400">
                        {results.without.net} ₽
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className={`mt-8 text-center text-xs opacity-70 ${
            darkMode ? "text-gray-400" : "text-gray-500"
          } backdrop-filter backdrop-blur-sm`}
        >
          &copy; {new Date().getFullYear()} Калькулятор зарплаты | Разработан с
          любовью и кодом ❤️
        </div>
      </div>
    </div>
  );
};

export default App;
