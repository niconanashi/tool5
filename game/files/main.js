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
        var scene = new g.Scene({
          game: g.game,
          assetPaths: ["/**/*"]
        });
        scene.onLoad.add(function () {
          var option = scene.asset.getJSONContent("/text/option.json");
          var optionName = option.name;
          var broadcasterPlayerId;
          g.game.onJoin.add(function (e) {
            broadcasterPlayerId = e.player.id;
          });
          var m1 = new g.Sprite({
            scene: scene,
            src: scene.assets["megane1"],
            x: 640,
            y: 360,
            touchable: true,
            anchorX: 0.5,
            anchorY: 0.5,
            scaleX: 0.5,
            scaleY: 0.5,
            parent: scene
          });
          var pointX = m1.x;
          var pointY = m1.y;
          m1.onPointMove.add(function (e) {
            if (broadcasterPlayerId == e.player.id || open) {
              m1.x += e.prevDelta.x;
              m1.y += e.prevDelta.y;
              if (m1.x < 0) {
                m1.x = 0;
              }
              if (m1.x > 1280) {
                m1.x = 1280;
              }
              if (m1.y < 0) {
                m1.y = 0;
              }
              if (m1.y > 740) {
                m1.y = 740;
              }
              m1.modified();
              pointX = m1.x;
              pointY = m1.y;
            }
          });
          m1.onPointDown.add(function (e) {
            if (broadcasterPlayerId == e.player.id || open) {
              pointX = m1.x;
              pointY = m1.y;
            }
          });
          var btn = new g.FilledRect({
            scene: scene,
            x: 1100,
            y: 30,
            cssColor: sliderBgColor,
            width: 80,
            height: 40,
            opacity: 0.8,
            touchable: true,
            parent: scene
          });
          btn.onPointDown.add(function (e) {
            if (broadcasterPlayerId == e.player.id || open) {
              if (m1.src == scene.assets["megane1"]) {
                m1.src = scene.assets["megane2"];
              } else {
                m1.src = scene.assets["megane1"];
              }
              m1.invalidate();
            }
          });
          var slider = new g.FilledRect({
            scene: scene,
            x: 200,
            y: 30,
            cssColor: sliderBgColor,
            width: 320,
            height: 40,
            opacity: 0.8,
            touchable: true,
            parent: scene
          });
          var slider2 = new g.FilledRect({
            scene: scene,
            x: 5,
            y: 5,
            cssColor: sliderColor,
            width: 300 * m1.scaleX,
            height: 30,
            parent: slider
          });
          var slider3 = new g.FilledRect({
            scene: scene,
            x: 300 * m1.scaleX,
            y: 0,
            cssColor: sliderHandleColor,
            width: 10,
            height: 30,
            parent: slider2
          });
          var sliderPoint = slider3.x;
          slider.onPointDown.add(function (e) {
            if (broadcasterPlayerId == e.player.id || open) {
              sliderPoint = e.point.x - 10;
              slider3.x = sliderPoint;
              if (slider3.x > 300) {
                slider3.x = 300;
              }
              if (slider3.x < 20) {
                slider3.x = 20;
              }
              slider2.width = slider3.x;
              slider3.modified();
              m1.scaleX = slider3.x / 300;
              m1.scaleY = m1.scaleX;
              m1.modified();
            }
          });
          slider.onPointMove.add(function (e) {
            if (broadcasterPlayerId == e.player.id || open) {
              sliderPoint += e.prevDelta.x;
              slider3.x = sliderPoint;
              if (slider3.x > 300) {
                slider3.x = 300;
              }
              if (slider3.x < 20) {
                slider3.x = 20;
              }
              slider2.width = slider3.x;
              slider3.modified();
              m1.scaleX = slider3.x / 300;
              m1.scaleY = m1.scaleX;
              m1.modified();
            }
          });
          var angleSlider = new g.FilledRect({
            scene: scene,
            x: 700,
            y: 30,
            cssColor: sliderBgColor,
            width: 320,
            height: 40,
            opacity: 0.8,
            touchable: true,
            parent: scene
          });
          var angleSlider2 = new g.FilledRect({
            scene: scene,
            x: 5,
            y: 5,
            cssColor: sliderColor,
            width: 150 + m1.angle,
            height: 30,
            parent: angleSlider
          });
          var angleSlider3 = new g.FilledRect({
            scene: scene,
            x: 150 + m1.angle,
            y: 0,
            cssColor: sliderHandleColor,
            width: 10,
            height: 30,
            parent: angleSlider2
          });
          var angleSliderPoint = angleSlider3.x;
          angleSlider.onPointDown.add(function (e) {
            if (broadcasterPlayerId == e.player.id || open) {
              angleSliderPoint = e.point.x - 10;
              angleSlider3.x = angleSliderPoint;
              if (angleSlider3.x > 300) {
                angleSlider3.x = 300;
              }
              if (angleSlider3.x < 0) {
                angleSlider3.x = 0;
              }
              angleSlider2.width = angleSlider3.x;
              angleSlider3.modified();
              m1.angle = (angleSlider3.x - 150) * (maxAngle / 150);
              m1.modified();
            }
          });
          angleSlider.onPointMove.add(function (e) {
            if (broadcasterPlayerId == e.player.id || open) {
              angleSliderPoint += e.prevDelta.x;
              angleSlider3.x = angleSliderPoint;
              if (angleSlider3.x > 300) {
                angleSlider3.x = 300;
              }
              if (angleSlider3.x < 0) {
                angleSlider3.x = 0;
              }
              angleSlider2.width = angleSlider3.x;
              angleSlider3.modified();
              m1.angle = (angleSlider3.x - 150) * (maxAngle / 150);
              m1.modified();
            }
          });
          var font1 = new g.DynamicFont({
            game: g.game,
            fontFamily: "sans-serif",
            size: 50,
            fontWeight: 1
          });
          var sliderLabel = new g.Label({
            scene: scene,
            font: font1,
            text: "大きさ",
            textColor: textColor,
            fontSize: 24,
            x: 5,
            y: 5,
            parent: slider
          });
          var angleSliderLabel = new g.Label({
            scene: scene,
            font: font1,
            text: "角度",
            textColor: textColor,
            fontSize: 24,
            x: 5,
            y: 5,
            parent: angleSlider
          });
          var btnLabel = new g.Label({
            scene: scene,
            font: font1,
            text: optionName,
            textColor: textColor,
            fontSize: 24,
            x: 5,
            y: 6,
            parent: btn
          });
          btn.width = btnLabel.width + 10;
          btn.modified();
        });
        var open = true; //放送者以外も操作可能か
        var sliderBgColor = "gray"; //スライダーの背景色
        var sliderColor = "lightblue"; //スライダーのバーの色
        var sliderHandleColor = "white"; //スライダーのハンドルの色
        var textColor = "black"; //文字の色
        var maxAngle = 60; //最大角度
        g.game.pushScene(scene);
      }
      module.exports = main;
    }, {}]
  }, {}, [1])(1);
});
