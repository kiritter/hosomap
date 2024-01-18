(function(global) {
    var MyApp = global.MyApp = global.MyApp || {};

    MyApp.RoutelineManager = class RoutelineManager {
        constructor(gaChannel, mapBoth, globalState, myChannel) {
            this.mapLeft = mapBoth.mapLeft;
            this.globalState = globalState;
            this.myChannel = myChannel;

            this.pathManager = new MyApp.PathManager(mapBoth, globalState);

            this.partPointManager = new MyApp.MarkerPartPointManager(null, mapBoth, globalState);
            this.eventManager1 = new MyApp.MarkerEventManager(gaChannel, mapBoth, globalState, MyApp.globalConst.ChapterNum.MISOGI);
            this.eventManager2 = new MyApp.MarkerEventManager(gaChannel, mapBoth, globalState, MyApp.globalConst.ChapterNum.UTAMAKURA);
            this.eventManager3 = new MyApp.MarkerEventManager(gaChannel, mapBoth, globalState, MyApp.globalConst.ChapterNum.UNIVERSE);
            this.eventManager4 = new MyApp.MarkerEventManager(gaChannel, mapBoth, globalState, MyApp.globalConst.ChapterNum.UKIYO);
            this.placePointManager = new MyApp.MarkerPlacePointManager(null, mapBoth, globalState);
            this.spotPointManager = new MyApp.MarkerSpotPointManager(null, mapBoth, globalState);
            this.nearbySpotPointManager = new MyApp.MarkerNearbySpotPointManager(null, mapBoth, globalState);
            this.nationalScenicSpotManager = new MyApp.MarkerNationalScenicSpotManager(null, mapBoth, globalState);
            this.touristSpotManager = new MyApp.MarkerTouristSpotManager(null, mapBoth, globalState);

            this.pathTokaidoManager = new MyApp.EachPathAfterTripManager(mapBoth, globalState, '', 'geojson/10_path_point_event/21a_tokaido.geojson');
            this.pathIsekaidoManager = new MyApp.EachPathAfterTripManager(mapBoth, globalState, '', 'geojson/10_path_point_event/22a_isekaido.geojson');
            this.pathFutamiManager = new MyApp.EachPathAfterTripManager(mapBoth, globalState, '', 'geojson/10_path_point_event/23a_futami.geojson');
            this.pathIgakaidoManager = new MyApp.EachPathAfterTripManager(mapBoth, globalState, '', 'geojson/10_path_point_event/24a_igakaido.geojson');
            this.pathNarakaidoManager = new MyApp.EachPathAfterTripManager(mapBoth, globalState, '', 'geojson/10_path_point_event/25a_narakaido.geojson');
            this.pathHasekaidoManager = new MyApp.EachPathAfterTripManager(mapBoth, globalState, '', 'geojson/10_path_point_event/26a_hasekaido.geojson');

            this.tokaidoStationPointManager = new MyApp.EachMarkerAfterTripStationPointManager(null, mapBoth, globalState, 'route_after_trip', 'geojson/10_path_point_event/21a_tokaido.geojson');
            this.isekaidoStationPointManager = new MyApp.EachMarkerAfterTripStationPointManager(null, mapBoth, globalState, 'route_after_trip', 'geojson/10_path_point_event/22a_isekaido.geojson');
            this.futamiStationPointManager = new MyApp.EachMarkerAfterTripStationPointManager(null, mapBoth, globalState, 'route_after_trip', 'geojson/10_path_point_event/23a_futami.geojson');
            this.igakaidoStationPointManager = new MyApp.EachMarkerAfterTripStationPointManager(null, mapBoth, globalState, 'route_after_trip', 'geojson/10_path_point_event/24a_igakaido.geojson');
            this.narakaidoStationPointManager = new MyApp.EachMarkerAfterTripStationPointManager(null, mapBoth, globalState, 'route_after_trip', 'geojson/10_path_point_event/25a_narakaido.geojson');
            this.hasekaidoStationPointManager = new MyApp.EachMarkerAfterTripStationPointManager(null, mapBoth, globalState, 'route_after_trip', 'geojson/10_path_point_event/26a_hasekaido.geojson');
            this.afterTripSpotPointManager = new MyApp.MarkerAfterTripSpotPointManager(null, mapBoth, globalState);
        }

        async init() {
            await this._initAll();


            this.settingMyChannel(this.myChannel);
        }

        async _initAll() {
            var promiseList = [];

            promiseList.push(this.pathManager.init());
            promiseList.push(this.partPointManager.init());
            promiseList.push(this.eventManager1.init());
            promiseList.push(this.eventManager2.init());
            promiseList.push(this.eventManager3.init());
            promiseList.push(this.eventManager4.init());
            promiseList.push(this.placePointManager.init());
            promiseList.push(this.spotPointManager.init());
            promiseList.push(this.nearbySpotPointManager.init());
            promiseList.push(this.nationalScenicSpotManager.init());
            promiseList.push(this.touristSpotManager.init());

            promiseList.push(this.pathTokaidoManager.init());
            promiseList.push(this.tokaidoStationPointManager.init());
            promiseList.push(this.pathIsekaidoManager.init());
            promiseList.push(this.isekaidoStationPointManager.init());
            promiseList.push(this.pathFutamiManager.init());
            promiseList.push(this.futamiStationPointManager.init());
            promiseList.push(this.pathIgakaidoManager.init());
            promiseList.push(this.igakaidoStationPointManager.init());
            promiseList.push(this.pathNarakaidoManager.init());
            promiseList.push(this.narakaidoStationPointManager.init());
            promiseList.push(this.pathHasekaidoManager.init());
            promiseList.push(this.hasekaidoStationPointManager.init());
            promiseList.push(this.afterTripSpotPointManager.init());

            await Promise.all(promiseList);
        }

        settingMyChannel(myChannel) {
        }

    };

}(this));
