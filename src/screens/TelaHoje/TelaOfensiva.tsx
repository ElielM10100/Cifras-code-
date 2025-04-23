import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GoBack from '../../components/common/GoBack/GoBack';


const TelaOfensiva = ({ atualizarOffensiveDays }: { atualizarOffensiveDays: (novosDias: string[]) => void }) => {
  const [offensiveDays, setOffensiveDays] = useState<string[]>([]);
  const [currentMonth, setCurrentMonth] = useState<string>('');
  const [lastChecked, setLastChecked] = useState<string | null>(null);
  const today = new Date();

  const formattedMonth = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}`;
  const todayFormatted = `${formattedMonth}-${today.getDate().toString().padStart(2, '0')}`;
  const monthName = today.toLocaleString('pt-BR', { month: 'long' }).toUpperCase();
  const year = today.getFullYear();

  useEffect(() => {
    initializeTracker();
    verificarExpiracaoOfensiva();
  }, []);



  const verificarExpiracaoOfensiva = async () => {
    try {
      const lastChecked = await AsyncStorage.getItem('lastChecked');
      const hojeFormatado = `${formattedMonth}-${today.getDate().toString().padStart(2, '0')}`;
  
      if (lastChecked !== hojeFormatado) {
        // O usuário não fez check-in hoje até as 23h, ofensiva será zerada
        await AsyncStorage.removeItem('offensiveDays');
        await AsyncStorage.removeItem('lastChecked');
        setOffensiveDays([]); // Zera os dias de ofensiva na UI
      }
    } catch (error) {
      console.error('Erro ao verificar expiração da ofensiva:', error);
    }
  };


  const initializeTracker = async () => {
    try {
      setCurrentMonth(formattedMonth);
      const storedMonth = await AsyncStorage.getItem('currentMonth');

      if (storedMonth !== formattedMonth) {
        await AsyncStorage.setItem('currentMonth', formattedMonth);
        await AsyncStorage.removeItem('offensiveDays');
        await AsyncStorage.removeItem('lastChecked');
        setOffensiveDays([]);
        setLastChecked(null);
      } else {
        const storedDays = await AsyncStorage.getItem('offensiveDays');
        const lastCheck = await AsyncStorage.getItem('lastChecked');

        setOffensiveDays(storedDays ? JSON.parse(storedDays) : []);
        setLastChecked(lastCheck);
      }
    } catch (error) {
      console.error('Erro ao inicializar ofensiva:', error);
    }
  };

  const checkInToday = async () => {
    try {
      if (lastChecked === todayFormatted) return;

      let storedDays: string[] = await AsyncStorage.getItem('offensiveDays')
        .then(data => (data ? JSON.parse(data) : []));

      if (!storedDays.includes(todayFormatted)) {
        storedDays.push(todayFormatted);
        await AsyncStorage.setItem('offensiveDays', JSON.stringify(storedDays));
        await AsyncStorage.setItem('lastChecked', todayFormatted);
      }

      setOffensiveDays(storedDays);
      setLastChecked(todayFormatted);
      atualizarOffensiveDays(storedDays);
    } catch (error) {
      console.error('Erro ao registrar Check-in:', error);
    }
  };

  const firstDayOfMonth = new Date(year, today.getMonth(), 1).getDay();
  const totalDays = new Date(year, today.getMonth() + 1, 0).getDate();

  const generateCalendar = () => {
    let daysArray = [];
    let week = Array(firstDayOfMonth).fill(null);

    for (let day = 1; day <= totalDays; day++) {
      week.push(day);
      if (week.length === 7) {
        daysArray.push(week);
        week = [];
      }
    }

    if (week.length > 0) {
      while (week.length < 7) {
        week.push(null);
      }
      daysArray.push(week);
    }

    return daysArray;
  };

  const calendarWeeks = generateCalendar();

  return (
    <View style={styles.container}>

      <View style={styles.voltar}>
        <GoBack color='white'/>
      </View>
      
      <Text style={styles.title}>SUA OFENSIVA DE {monthName} {year}</Text>
      <Text style={styles.counter}>
        <Text style={styles.counterNumber}>{offensiveDays.length}</Text> dias de ofensiva 🔥
      </Text>

      <View style={styles.weekRow}>
        {['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'].map((day, index) => (
          <Text key={index} style={styles.weekDay}>{day}</Text>
        ))}
      </View>

      <View style={styles.calendarContainer}>
        {calendarWeeks.map((week, weekIndex) => (
          <View key={weekIndex} style={styles.weekContainer}>
            {week.map((day, index) => {
              const formattedDay = day
                ? `${formattedMonth}-${day.toString().padStart(2, '0')}`
                : null;
              const isMarked = formattedDay && offensiveDays.includes(formattedDay);

              return (
                <View key={index} style={[
                  styles.dayBox,
                  isMarked && styles.markedDay,
                  today.getDate() === day && styles.today
                ]}>
                  {day !== null ? (
                    <Text style={[
                      styles.dayText,
                      today.getDate() === day && styles.todayText
                    ]}>
                      {day}
                    </Text>
                  ) : (
                    <View style={styles.emptySpace} />
                  )}
                </View>
              );
            })}
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.button, lastChecked === todayFormatted && styles.buttonDisabled]}
        onPress={checkInToday}
        disabled={lastChecked === todayFormatted}
      >
        <Text style={styles.buttonText}>
          {lastChecked === todayFormatted ? '✅ Check-in Feito' : '📅 Fazer Check-in'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#121212',
    padding: 20,
  },
  title: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  counter: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
  },
  counterNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffcc00',
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 14,
    marginBottom: 10,
  },
  weekDay: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '14%', 
  },
  calendarContainer: {
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    width: '100%',
  },
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  dayBox: {
    width: '12.5%',
    aspectRatio: 1, 
    margin: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 8,
  },
  markedDay: {
    backgroundColor: '#F0DC0620',
  },
  today: {
    borderWidth: 2,
    borderColor: '#ffcc00',
  },
  todayText: {
    color: '#ffcc00',
    fontWeight: 'bold',
  },
  emptySpace: {
    width: '14%',
    aspectRatio: 1,
  },
  dayText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  button: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#ff6600',
    borderRadius: 10,
  },
  buttonDisabled: {
    backgroundColor: '#555',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  voltar:{
    marginTop: -220,
    marginBottom: 60,
    marginLeft: 30
  }
});

export default TelaOfensiva;