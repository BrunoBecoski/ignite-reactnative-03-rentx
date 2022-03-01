declare namespace ReactNavigation {
  export interface RootParamList extends RootStackParamList {
    SignIn: NavigationStackProps<string>;
    Home: NavigationStackProps<string>;  
    MyCars: NavigationStackProps<string>;
    CarDetails: NavigationStackProps<string>;  
    Scheduling: NavigationStackProps<string>;  
    SchedulingDetails: NavigationStackProps<string>;  
    SchedulingComplete: NavigationStackProps<string>;  
  }
}
