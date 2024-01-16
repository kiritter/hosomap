(function(global) {
    var MyApp = global.MyApp = global.MyApp || {};

    MyApp.MarkerEventManager = class MarkerEventManager {
        constructor(gaChannel, mapBoth, globalState, chapterNum) {
            this.gaChannel = gaChannel;
            this.mapBoth = mapBoth;
            this.globalState = globalState;
            this.chapterNum = chapterNum;

            this.list = [
                {timeRangeType: MyApp.globalState.const.TIME_RANGE_TYPE_YUSHI, url: 'geojson/10_path_point_event/01a_path_point_event.geojson'},
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
            var layerName = `route_event_${this.chapterNum}`;
            var self = this;
            var _filterGeojsonPredicate = function(properties) {
                if (properties.chapterNum === self.chapterNum && properties.isEventMarker === true) {
                    return true;
                }
                return false;
            };
            var callbacks = {
                'tooltipContentCallback': null,
                'popupContentCallback': MarkerEventManager._buildPopupContent,
                'filterGeojsonPredicate': _filterGeojsonPredicate,
            };
            var options = {
                shouldCircleMarker: false,
                circleMarkerColNames: null,
                shouldTooltip: false,
                tooltipNames: null,
                shouldPopup: true,
                popupNames: {className: 'popup-haiku'},
                popupOptionValues: {maxWidth: 390},
                resourceIdColName: 'eventMarkerId',
                isCustomIconMarker: false,
                customIconUrl: '',
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
`;
            return content;
        }

        static _buildPopupContent(properties) {
            var content = `
<table class="event-table">
    <colgroup>
        <col class="event-table-col-caption">
        <col class="event-table-col-value">
    </colgroup>
    <thead>
        <tr>
            <th colspan="2" class="event-chapter-title" style="background-color: ${properties.eventChapterTitleColor};">${properties.chapterTitle}</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th>本文<br>抜粋</th>
            <td class="event-text">${properties.text}</td>
        </tr>
        <tr>
            <th>芭蕉</th>
            <td class="event-haiku">${properties.basyo}</td>
        </tr>
        <tr>
            <th>曾良</th>
            <td class="event-haiku">${properties.sora}</td>
        </tr>
        <tr>
            <th class="event-desc-caption">補足</th>
            <td class="event-desc-content">${properties.note}</td>
        </tr>
    </tbody>
</table>
`;
            return content;
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
