import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Line, Circle, Text as SvgText } from 'react-native-svg';

interface DiagramaAcordeProps {
  nome: string;
  posicoes: number[];
  pestana?: number;
  casa?: number;
}

const DiagramaAcorde: React.FC<DiagramaAcordeProps> = ({
  posicoes,
  pestana,
  casa = 1,
}) => {
  const width = 40;
  const height = 60;
  const numCasas = 5;
  const numCordas = 6;
  const espacoCasas = height / (numCasas + 1);
  const espacoCordas = width / (numCordas - 1);

  return (
    <View style={styles.container}>
      <Svg width={width} height={height}>
        {/* Linhas horizontais (casas) */}
        {Array.from({ length: numCasas + 1 }).map((_, i) => (
          <Line
            key={`casa-${i}`}
            x1={0}
            y1={i * espacoCasas}
            x2={width}
            y2={i * espacoCasas}
            stroke="#fff"
            strokeWidth={i === 0 ? 2 : 1}
          />
        ))}

        {/* Linhas verticais (cordas) */}
        {Array.from({ length: numCordas }).map((_, i) => (
          <Line
            key={`corda-${i}`}
            x1={i * espacoCordas}
            y1={0}
            x2={i * espacoCordas}
            y2={height - espacoCasas}
            stroke="#fff"
            strokeWidth={1}
          />
        ))}

        {/* Pestana */}
        {pestana !== undefined && (
          <Line
            x1={0}
            y1={pestana * espacoCasas}
            x2={width}
            y2={pestana * espacoCasas}
            stroke="#fff"
            strokeWidth={4}
          />
        )}

        {/* Posições dos dedos */}
        {posicoes.map((pos, i) => {
          if (pos > 0) {
            return (
              <Circle
                key={`pos-${i}`}
                cx={i * espacoCordas}
                cy={(pos - 0.5) * espacoCasas}
                r={5}
                fill="#fff"
              />
            );
          } else if (pos === 0) {
            return (
              <Circle
                key={`pos-${i}`}
                cx={i * espacoCordas}
                cy={-5}
                r={3}
                fill="none"
                stroke="#fff"
                strokeWidth={1}
              />
            );
          } else {
            return (
              <SvgText
                key={`pos-${i}`}
                x={i * espacoCordas}
                y={-5}
                fontSize={12}
                fill="#fff"
                textAnchor="middle"
              >
                ×
              </SvgText>
            );
          }
        })}

        {/* Número da casa */}
        {casa > 1 && (
          <SvgText
            x={width + 5}
            y={espacoCasas}
            fontSize={10}
            fill="#fff"
            textAnchor="start"
          >
            {casa}
          </SvgText>
        )}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
});

export default DiagramaAcorde; 