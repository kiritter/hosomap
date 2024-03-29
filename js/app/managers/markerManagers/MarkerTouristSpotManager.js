(function(global) {
    var MyApp = global.MyApp = global.MyApp || {};

    MyApp.MarkerTouristSpotManager = class MarkerTouristSpotManager {
        constructor(gaChannel, mapBoth, globalState) {
            this.gaChannel = gaChannel;
            this.mapBoth = mapBoth;
            this.globalState = globalState;

            this.list = [
                {timeRangeType: MyApp.globalState.const.TIME_RANGE_TYPE_YUSHI, url: 'geojson/10_path_point_event/12a_tourist_spot.geojson'},
            ];

            this.coreManagerByKey = this._createCoreManagerMap();
        }

        _createCoreManagerMap() {
            var coreManagerByKey = new Map();
            var self = this;
            this.list.forEach((el) => {
                var coreManager = self._createCoreManager(el.timeRangeType, el.url);
                coreManagerByKey.set(`${el.timeRangeType}`, coreManager);
            });
            return coreManagerByKey;
        }
        _createCoreManager(targetTimeRangeType, targetUrl) {
            var layerName = 'route_tourist_spot';
            var callbacks = {
                'tooltipContentCallback': MarkerTouristSpotManager._buildTooltipContent,
                'popupContentCallback': null,
                'filterGeojsonPredicate': MarkerTouristSpotManager._filterGeojsonPredicate,
            };
            var options = {
                shouldCircleMarker: false,
                circleMarkerColNames: null,
                shouldTooltip: true,
                tooltipNames: {className: 'tooltip-tourist-spot', geZoom: 'touristSpotTooltipGeZoom', direction: 'touristSpotTooltipDirection'},
                shouldPopup: false,
                popupNames: null,
                isCustomIconMarker: true,
                customIconUrl: 'images/tourist_spot.png',
            };
            var coreManager = new MyApp.MarkerCoreManager(this.gaChannel, this.mapBoth, this.globalState, layerName, callbacks, options, targetTimeRangeType, targetUrl);
            return coreManager;
        }

        async init() {
            var promiseList = [];
            for (var [key, coreManager] of this.coreManagerByKey) {
                promiseList.push(coreManager.init());
            }
            await Promise.all(promiseList);
        }

        static _buildTooltipContent(properties) {
            var content = `
<div>
    <div class="tooltip-tourist-spot-name">${properties.touristSpotName}</div>
</div>
`;
            return content;
        }

        static _buildPopupContent(properties) {
            var content = `
`;
            return content;
        }

        static _filterGeojsonPredicate(properties) {
            if (properties.isTouristSpot === true) {
                return true;
            }
            return false;
        }

        redraw(selectedTimeRangeType) {
            for (var [key, coreManager] of this.coreManagerByKey) {
                coreManager.clearLayers();
            }

            var currentTimeRangeType = selectedTimeRangeType;
            var targetCoreManager = this.coreManagerByKey.get(`${currentTimeRangeType}`);
            targetCoreManager.redrawLayers();
        }

    };

}(this));
