(function(global) {
    var MyApp = global.MyApp = global.MyApp || {};
    MyApp.configMap = {};

    MyApp.configMap.TileType = {
        Empty: 1,
        Standard: 2,
        Colorized: 3,
        OldEdition: 4,
        MyZxy: 5,
    };

    MyApp.configMap.MapLeftBaseList = [
        {name: 'osm', selected: true},
    ];
    MyApp.configMap.MapLeftOverlayList = [
        {name: 'old_edition', selected: false},
        {name: 'ort_old10', selected: false},
        {name: 'latest', selected: false},
        {name: 'hillshade', selected: true},
        {name: `route_event_${MyApp.globalConst.ChapterNum.MISOGI}`, selected: true},
        {name: `route_event_${MyApp.globalConst.ChapterNum.UTAMAKURA}`, selected: true},
        {name: `route_event_${MyApp.globalConst.ChapterNum.UNIVERSE}`, selected: true},
        {name: `route_event_${MyApp.globalConst.ChapterNum.UKIYO}`, selected: true},
        {name: 'route_place_point', selected: true},
        {name: 'route_after_trip', selected: true},
        {name: 'route_national_scenic_spot', selected: false},
        {name: 'route_tourist_spot', selected: false},
        {name: 'recommend_100meizan', selected: false},
    ];

    MyApp.configMap.LayerConfigTable = {
        'osm': {
            caption: 'OpenStreetMap',
            options: {
                myTileUrl: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors',
                crossOrigin: 'anonymous',
                minZoom: 5,
                maxZoom: 18,
                maxNativeZoom: 18,
                myLayerName: 'osm',
                myCacheName: 'osm',
                myCacheRepo: MyApp.globalCacheRepo,
            },
        },


        'ort_old10': {
            caption: '1961-1969年(昭和36-44年) (Zoom:10-17)',
            options: {
                myTileUrl: 'https://cyberjapandata.gsi.go.jp/xyz/ort_old10/{z}/{x}/{y}.png',
                attribution: `<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>`,
                crossOrigin: 'anonymous',
                minZoom: 5,
                maxZoom: 18,
                maxNativeZoom: 17,
                myLayerName: 'ort_old10',
                myCacheName: 'ort_old10',
                myCacheRepo: MyApp.globalCacheRepo,
            },
        },
        'latest': {
            caption: '最新 (Zoom:5-8,9-13,14-18)',
            options: {
                myTileUrl: 'https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg',
                attribution: `<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>`,
                crossOrigin: 'anonymous',
                minZoom: 5,
                maxZoom: 18,
                maxNativeZoom: 18,
                myLayerName: 'latest',
                myCacheName: 'latest',
                myCacheRepo: MyApp.globalCacheRepo,
                addSeparatorToBottom: true,
            },
        },
        'hillshade': {
            caption: '陰影起伏図 (Zoom:5-16)',
            options: {
                myTileUrl: 'https://cyberjapandata.gsi.go.jp/xyz/hillshademap/{z}/{x}/{y}.png',
                attribution: `<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>`,
                crossOrigin: 'anonymous',
                minZoom: 5,
                maxZoom: 18,
                maxNativeZoom: 16,
                opacity: 0.5,
                myLayerName: 'hillshade',
                myCacheName: 'hillshade',
                myCacheRepo: MyApp.globalCacheRepo,
                blockDescription: '陰影起伏図を重ねて表示できます',
                blockDescriptionCssClassName: 'block-description',
                addSeparatorToBottom: true,
            },
        },

        'old_edition': {
            caption: '旧版地図(日本版MapWarper[五万分一地形圖]) (Zoom:10-15)',
            tileType: MyApp.configMap.TileType.OldEdition,
            options: {
                myTileUrl: 'https://mapwarper.h-gis.jp/maps/tile/{area_id}/{z}/{x}/{y}.png',
                attribution: `<a href='https://mapwarper.h-gis.jp/about' target='_blank'>日本版MapWarper</a>`,
                minZoom: 10,
                maxZoom: 18,
                maxNativeZoom: 15,
                myLayerName: 'old_edition',
                myCacheName: 'old_edition',
                myCacheRepo: MyApp.globalCacheRepo,
                myOldEditionMapIdLocalRepo: MyApp.oldEditionMapIdLocalRepo,
                myOldEditionMapIdCacheRepo: MyApp.oldEditionMapIdCacheRepo,
                blockDescription: '戦前期の地図、航空写真を表示できます（いずれか1つ）',
                blockDescriptionCssClassName: 'block-description',
            },
        },

        'route_event_1': {
            caption: '1部：旅の禊(みそぎ)',
            tileType: MyApp.configMap.TileType.Empty,
            options: {
                minZoom: 5,
                maxZoom: 18,
                myLayerName: `route_event_${MyApp.globalConst.ChapterNum.MISOGI}`,
                overlayMenuCssClassName: 'overlay-menu-misogi',
                blockDescription: '『おくのほそ道』の俳句を表示します（※参考文献の4部構成）',
                blockDescriptionCssClassName: 'block-description',
            },
        },
        'route_event_2': {
            caption: '2部：歌枕巡礼（⇒無常迅速）',
            tileType: MyApp.configMap.TileType.Empty,
            options: {
                minZoom: 5,
                maxZoom: 18,
                myLayerName: `route_event_${MyApp.globalConst.ChapterNum.UTAMAKURA}`,
                overlayMenuCssClassName: 'overlay-menu-utamakura',
            },
        },
        'route_event_3': {
            caption: '3部：大いなる宇宙の運行（⇒"不易流行"の宇宙観）',
            tileType: MyApp.configMap.TileType.Empty,
            options: {
                minZoom: 5,
                maxZoom: 18,
                myLayerName: `route_event_${MyApp.globalConst.ChapterNum.UNIVERSE}`,
                overlayMenuCssClassName: 'overlay-menu-universe',
            },
        },
        'route_event_4': {
            caption: '4部：浮世帰り（⇒"かるみ"の境地）',
            tileType: MyApp.configMap.TileType.Empty,
            options: {
                minZoom: 5,
                maxZoom: 18,
                myLayerName: `route_event_${MyApp.globalConst.ChapterNum.UKIYO}`,
                overlayMenuCssClassName: 'overlay-menu-ukiyo',
                addSeparatorToBottom: true,
            },
        },
        'route_place_point': {
            caption: '本文に登場する歌枕や場所 (及び曾良随行日記/経由想定地)',
            tileType: MyApp.configMap.TileType.Empty,
            options: {
                minZoom: 5,
                maxZoom: 18,
                myLayerName: 'route_place_point',
                blockDescription: '場所を表示します',
                blockDescriptionCssClassName: 'block-description',
            },
        },
        'route_after_trip': {
            caption: 'エピローグ：旅直後の関連場所 (伊勢街道 他)',
            tileType: MyApp.configMap.TileType.Empty,
            options: {
                minZoom: 5,
                maxZoom: 18,
                myLayerName: 'route_after_trip',
            },
        },
        'route_national_scenic_spot': {
            caption: '国指定名勝：おくのほそ道の風景地 (2023年12月時点)',
            tileType: MyApp.configMap.TileType.Empty,
            options: {
                minZoom: 5,
                maxZoom: 18,
                myLayerName: 'route_national_scenic_spot',
            },
        },
        'route_tourist_spot': {
            caption: '松尾芭蕉/奥の細道 関連施設',
            tileType: MyApp.configMap.TileType.Empty,
            options: {
                minZoom: 5,
                maxZoom: 18,
                myLayerName: 'route_tourist_spot',
            },
        },
        'recommend_100meizan': {
            caption: 'おまけ：日本百名山',
            tileType: MyApp.configMap.TileType.Empty,
            options: {
                minZoom: 5,
                maxZoom: 18,
                myLayerName: 'recommend_100meizan',
                isLastElement: true,
                lastElementLinkInfoList: [
                    {
                        sourceSummaryUrl: 'html/source_summary.html',
                        sourceSummaryText: '地図データの出典情報、参考文献情報',
                        sourceSummaryNote: '',
                        sourceSummaryCssClassName: 'source-summary-link',
                    },
                    {
                        sourceSummaryUrl: '../#product-map',
                        sourceSummaryText: '当Webサイトの兄弟地図サイトを見る',
                        sourceSummaryNote: '',
                        sourceSummaryCssClassName: 'source-summary-link',
                    },
                ],
            },
        },

    };

}(this));
