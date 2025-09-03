import React, { useState, useEffect } from 'react';
import { X, Calendar, Lock } from 'lucide-react';

interface Day {
  number: number;
  isAvailable: boolean;
  content: string;
}

function App() {
  const [selectedDay, setSelectedDay] = useState<Day | null>(null);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const messages = [
    "Fue el comienzo de todo, un mes bello y hermoso.",
    "Una nueva aventura surgió, nuevos mensajes que siguen apareciendo día tras día"
  ];

  const generateDays = (): Day[] => {
    const days: Day[] = [];
    const today = currentDate.getDate();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Asumimos que estamos en septiembre 2024
    const septemberYear = 2025;
    const septemberMonth = 8; // 0-indexed, so 8 = September

    for (let i = 1; i <= 25; i++) {
      const dayDate = new Date(septemberYear, septemberMonth, i);
      const isAvailable = dayDate <= currentDate;

      days.push({
        number: i,
        isAvailable,
        content: `${messages[i - 1]} Día ${i} de septiembre ha sido desbloqueado con contenido especial para ti.`
      });
    }

    return days;
  };

  const days = generateDays();

  const handleDayClick = (day: Day) => {
    if (day.isAvailable) {
      setSelectedDay(day);
    }
  };

  const closeModal = () => {
    setSelectedDay(null);
  };

  const getColorClass = (day: Day, index: number) => {
    if (!day.isAvailable) {
      return 'bg-rose-100 text-rose-300 cursor-not-allowed';
    }

    const colors = [
      'bg-rose-200 hover:bg-rose-300 text-rose-800',
      'bg-pink-200 hover:bg-pink-300 text-pink-800',
      'bg-red-200 hover:bg-red-300 text-red-800',
      'bg-rose-300 hover:bg-rose-400 text-rose-900',
      'bg-pink-300 hover:bg-pink-400 text-pink-900'
    ];

    return `${colors[index % colors.length]} cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105`;
  };

  useEffect(() => {
    // Actualizar la fecha cada minuto para reflejar cambios en tiempo real
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calendar className="w-8 h-8 text-rose-600" />
            <h1 className="text-4xl sm:text-5xl font-bold text-rose-800">
              Septiembre 2025
            </h1>

          </div>

          <p className="text-lg text-rose-600 max-w-2xl mx-auto">
            Para mi amada Melanie Lisette
          </p>

          <p className="text-lg text-rose-600 max-w-2xl mx-auto">
            Descubre cada día del mes. Los días disponibles se desbloquean progresivamente.
          </p>

          <div className="mt-4 text-sm text-rose-500">
            Fecha actual: {currentDate.toLocaleDateString('es-ES', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3 sm:gap-4 lg:gap-6">
          {days.map((day, index) => (
            <div
              key={day.number}
              onClick={() => handleDayClick(day)}
              className={`
                relative aspect-square rounded-2xl p-4 flex flex-col items-center justify-center
                border-2 border-white/50 backdrop-blur-sm
                transform transition-all duration-300
                ${getColorClass(day, index)}
                ${!day.isAvailable ? 'opacity-60' : ''}
              `}
            >
              {/* Day Number */}
              <div className="text-2xl sm:text-3xl font-bold mb-1">
                {day.number}
              </div>

              {/* Day Label */}
              <div className="text-xs uppercase tracking-wide font-medium opacity-80">
                Sep
              </div>

              {/* Lock Icon for unavailable days */}
              {!day.isAvailable && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/20 rounded-2xl">
                  <Lock className="w-6 h-6 text-rose-400" />
                </div>
              )}

              {/* Available indicator */}
              {day.isAvailable && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white shadow-sm"></div>
              )}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-rose-300 rounded"></div>
            <span className="text-rose-700">Días disponibles</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-rose-100 rounded opacity-60"></div>
            <span className="text-rose-500">Días bloqueados</span>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedDay && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-hidden transform transition-all duration-300 scale-100">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-rose-500 to-pink-500 text-white p-6 relative">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3">
                <Calendar className="w-6 h-6" />
                <h2 className="text-2xl font-bold">
                  {selectedDay.number} de Septiembre
                </h2>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="prose prose-rose max-w-none">
                <p className="text-gray-700 leading-relaxed text-base">
                  {selectedDay.content}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-rose-100">
                <button
                  onClick={closeModal}
                  className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 px-6 rounded-xl font-medium hover:from-rose-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-[1.02]"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;