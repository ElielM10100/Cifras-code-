export const obterDataAtualFormatada = (): string => {
    const data = new Date();
    
    // Array com os meses em português
    const meses = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
  
    // Obtém o dia e o nome do mês
    const dia = data.getDate();
    const nomeMes = meses[data.getMonth()];
  
    return `${dia} de ${nomeMes}`;
  };
  
  // Exemplo de uso:
  // console.log(obterDataAtualFormatada()); // "27 de Fevereiro" (se for 27/02)
  