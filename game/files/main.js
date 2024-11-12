function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function (f) {
  if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object" && typeof module !== "undefined") {
    module.exports = f();
  } else if (typeof define === "function" && define.amd) {
    define([], f);
  } else {
    var g;
    if (typeof window !== "undefined") {
      g = window;
    } else if (typeof global !== "undefined") {
      g = global;
    } else if (typeof self !== "undefined") {
      g = self;
    } else {
      g = this;
    }
    g.aez_bundle_main = f();
  }
})(function () {
  var define, module, exports;
  return function () {
    function r(e, n, t) {
      function o(i, f) {
        if (!n[i]) {
          if (!e[i]) {
            var c = "function" == typeof require && require;
            if (!f && c) return c(i, !0);
            if (u) return u(i, !0);
            var a = new Error("Cannot find module '" + i + "'");
            throw a.code = "MODULE_NOT_FOUND", a;
          }
          var p = n[i] = {
            exports: {}
          };
          e[i][0].call(p.exports, function (r) {
            var n = e[i][1][r];
            return o(n || r);
          }, p, p.exports, r, e, n, t);
        }
        return n[i].exports;
      }
      for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
      return o;
    }
    return r;
  }()({
    1: [function (require, module, exports) {
      function main(param) {
        var scale = 1; //画像の拡大率
        var scene = new g.Scene({
          game: g.game,
          assetIds: ["heart", "spade", "sparkle"]
        });
        var color = "heart";
        scene.loaded.add(function () {
          function generateHeart(x, y, color) {
            // heart変数にheart画像のSpriteを追加
            var heart = new g.Sprite({
              scene: scene,
              src: scene.assets[color],
              parent: container,
              x: x,
              y: y,
              anchorX: 0.5,
              anchorY: 0.5,
              scaleX: scale,
              scaleY: scale,
              tag: {
                counter: 0
              }
            });
            // 毎フレーム実行されるイベントであるupdateにイベントを登録
            heart.update.add(function (e) {
              // 毎フレームカウンタを追加
              heart.tag.counter++;
              if (heart.tag.counter > 100) {
                // カウンタが100を超えていたら削除する
                heart.destroy();
              } else if (heart.tag.counter > 50) {
                // カウンタが50を超えていたら半透明にしていく
                heart.opacity = (100 - heart.tag.counter) / 50;
                // このエンティティが変更されたという通知
                heart.modified();
              }
            });
          }
          // イベント取得用に、ローカルエンティティを透明で作成
          var container = new g.E({
            scene: scene,
            x: 0,
            y: 0,
            width: g.game.width,
            height: g.game.height,
            touchable: true,
            local: true,
            parent: scene
          });
          // ローカルエンティティのpointDownトリガーに関数を登録
          container.pointDown.add(function (e) {
            // タッチされたらローカル情報と座標情報を基にイベントを生成
            g.game.raiseEvent(new g.MessageEvent({
              type: "generate-heart",
              color: color,
              x: e.point.x,
              y: e.point.y
            }));
          });
          // Messageイベントを受け取るためのハンドラを登録
          scene.message.add(function (e) {
            // イベント種別を見て
            var data = e.data;
            if (data.type === "generate-heart") {
              // 色と座標情報を基にハートを作成
              generateHeart(data.x, data.y, data.color);
            }
          });
          // ---- ここからコントロールパネル。基本は全てローカルエンティティとして処理
          // コントロールパネルを作成。クリッピングをするためPaneを使う
          var controlPanel = new g.Pane({
            scene: scene,
            x: g.game.width - 96,
            y: 64,
            width: 74,
            height: 74,
            local: true,
            tag: {
              expand: false
            },
            parent: scene
          });
          // コントロールパネルの開閉スイッチを配置
          var panelSwitch = new g.FilledRect({
            scene: scene,
            x: 10,
            y: 0,
            width: 64,
            height: 64,
            cssColor: "#ccc",
            local: true,
            touchable: true,
            parent: controlPanel
          });
          // 選択されているツールにつける枠
          var activeTool = new g.FilledRect({
            scene: scene,
            x: 14,
            // 座標はオープン時に計算するので仮
            y: 94,
            cssColor: "#f79",
            width: 68,
            height: 68,
            opacity: 0.5,
            local: true,
            parent: controlPanel
          });
          // コントロールパネルに表示するツールアイコンを作成する関数
          function createTool(assetId, y) {
            var tool = new g.Sprite({
              scene: scene,
              src: scene.assets[assetId],
              x: 16,
              y: y,
              parent: controlPanel,
              local: true,
              touchable: true,
              tag: {
                selected: true,
                assetId: assetId
              }
            });
            // ツールアイコンは使いまわすのでリサイズしておく
            tool.width = 64;
            tool.height = 64;
            tool.invalidate();
            // このツールを選択した結果を反映
            tool.pointDown.add(function (e) {
              color = tool.tag.assetId;
              activeTool.x = e.target.x - 2;
              activeTool.y = e.target.y - 2;
              activeTool.modified();
            });
            return tool;
          }
          var tools = [];
          // 用意するツールは三種類
          tools.push(createTool("heart", 96));
          tools.push(createTool("spade", 192));
          tools.push(createTool("sparkle", 288));
          // 開閉スイッチに触れたらコントロールパネルを開く
          panelSwitch.pointDown.add(function (e) {
            controlPanel.tag.expand = !controlPanel.tag.expand;
            if (controlPanel.tag.expand) {
              // 展開する
              controlPanel.height = 384;
              controlPanel.width = 96;
            } else {
              // 折りたたむ
              controlPanel.height = 74;
              controlPanel.width = 74;
            }
            controlPanel.invalidate();
          });
          // ここまでコントロールパネル ---- 

          // 最初に中心にハートを出現させる
          generateHeart(g.game.width / 2 - scene.assets["heart"].width / 2, g.game.height / 2 - scene.assets["heart"].height / 2, color);
        });
        g.game.pushScene(scene);
      }
      module.exports = main;
    }, {}]
  }, {}, [1])(1);
});
