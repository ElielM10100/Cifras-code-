import { StackScreenProps } from '@react-navigation/stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { NavigationProp, RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  Login: undefined;
  Cadastro: undefined;
  TelaInicial: undefined;
  TelaHoje: undefined;
  TelaBuscar: undefined;
  TelaCifra: { cifraId: string };
  TelaOpcoesCifra: { cifraId: string };
  TelaFavoritos: undefined;
  TelaArtista: { artistaId: string };
};

// Props genéricos para qualquer tela
export type RootStackScreenProps<T extends keyof RootStackParamList> = 
  StackScreenProps<RootStackParamList, T>;

// Props específicos para cada tela
export type TelaInicialProps = {
  navigation: NavigationProp<RootStackParamList, 'TelaInicial'>;
};

export type TelaHojeProps = RootStackScreenProps<'TelaHoje'>;
export type TelaBuscarProps = RootStackScreenProps<'TelaBuscar'>;
export type TelaCifraProps = {
  navigation: NavigationProp<RootStackParamList, 'TelaCifra'>;
  route: RouteProp<RootStackParamList, 'TelaCifra'>;
};

export type TelaOpcoesCifraProps = {
  navigation: NavigationProp<RootStackParamList, 'TelaOpcoesCifra'>;
  route: RouteProp<RootStackParamList, 'TelaOpcoesCifra'>;
};

export type TelaFavoritosProps = {
  navigation: NavigationProp<RootStackParamList, 'TelaFavoritos'>;
};

export type TelaArtistaProps = RootStackScreenProps<'TelaArtista'>;
