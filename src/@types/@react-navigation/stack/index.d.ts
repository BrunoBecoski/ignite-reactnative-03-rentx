declare namespace ReactNavigation {
  export interface RootParamList extends RootStackParamList {
    Home: NavigationStackProps<string>;  
    CarDetails: NavigationStackProps<string>;  
    Scheduling: NavigationStackProps<string>;  
    SchedulingDetails: NavigationStackProps<string>;  
    SchedulingComplete: NavigationStackProps<string>;  
  }
}
