import { NavigationTree } from '../types/navigation'

export const NavTree: NavigationTree = {
  Root: {
    TabsRudiment: {
      title: 'Root',
      path: 'root',
      type: 'tabs'
    }
  },
  TabsBranch: {
    MapStackRudiment: {
      title: 'Map',
      path: 'tabs-map-stack-rudiment'
    },
    SearchStackRudiment: {
      title: 'Search',
      path: 'tabs-search-stack-rudiment'
    }
  },
  MapBranch: {
    MapScreen: {
      title: 'Map',
      path: 'tabs-map-stack-map-screen'
    }
  },
  SearchBranch: {
    SearchScreen: {
      title: 'Search',
      path: 'tabs-search-stack-search-screen'
    }
  }
}