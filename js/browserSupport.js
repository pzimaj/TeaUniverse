/*! modernizr 3.6.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-arrow-contains-es6array-es6collections-es6math-es6number-es6object-es6string-generators-promises-setclasses !*/
!(function (window, document, undefined) {
  function setClasses(e) {
    var n = docElement.className,
      t = Modernizr._config.classPrefix || "";
    if ((isSVG && (n = n.baseVal), Modernizr._config.enableJSClass)) {
      var r = new RegExp("(^|\\s)" + t + "no-js(\\s|$)");
      n = n.replace(r, "$1" + t + "js$2");
    }
    Modernizr._config.enableClasses &&
      ((n += " " + t + e.join(" " + t)),
      isSVG ? (docElement.className.baseVal = n) : (docElement.className = n));
  }
  function is(e, n) {
    return typeof e === n;
  }
  function testRunner() {
    var e, n, t, r, o, i, s;
    for (var a in tests)
      if (tests.hasOwnProperty(a)) {
        if (
          ((e = []),
          (n = tests[a]),
          n.name &&
            (e.push(n.name.toLowerCase()),
            n.options && n.options.aliases && n.options.aliases.length))
        )
          for (t = 0; t < n.options.aliases.length; t++)
            e.push(n.options.aliases[t].toLowerCase());
        for (r = is(n.fn, "function") ? n.fn() : n.fn, o = 0; o < e.length; o++)
          (i = e[o]),
            (s = i.split(".")),
            1 === s.length
              ? (Modernizr[s[0]] = r)
              : (!Modernizr[s[0]] ||
                  Modernizr[s[0]] instanceof Boolean ||
                  (Modernizr[s[0]] = new Boolean(Modernizr[s[0]])),
                (Modernizr[s[0]][s[1]] = r)),
            classes.push((r ? "" : "no-") + s.join("-"));
      }
  }
  var classes = [],
    tests = [],
    ModernizrProto = {
      _version: "3.6.0",
      _config: {
        classPrefix: "",
        enableClasses: !0,
        enableJSClass: !0,
        usePrefixes: !0,
      },
      _q: [],
      on: function (e, n) {
        var t = this;
        setTimeout(function () {
          n(t[e]);
        }, 0);
      },
      addTest: function (e, n, t) {
        tests.push({ name: e, fn: n, options: t });
      },
      addAsyncTest: function (e) {
        tests.push({ name: null, fn: e });
      },
    },
    Modernizr = function () {};
  (Modernizr.prototype = ModernizrProto),
    (Modernizr = new Modernizr()),
    Modernizr.addTest(
      "es6array",
      !!(
        Array.prototype &&
        Array.prototype.copyWithin &&
        Array.prototype.fill &&
        Array.prototype.find &&
        Array.prototype.findIndex &&
        Array.prototype.keys &&
        Array.prototype.entries &&
        Array.prototype.values &&
        Array.from &&
        Array.of
      )
    ),
    Modernizr.addTest("arrow", function () {
      try {
        eval("()=>{}");
      } catch (e) {
        return !1;
      }
      return !0;
    }),
    Modernizr.addTest(
      "es6collections",
      !!(window.Map && window.Set && window.WeakMap && window.WeakSet)
    );
  var docElement = document.documentElement,
    isSVG = "svg" === docElement.nodeName.toLowerCase();
  Modernizr.addTest("contains", is(String.prototype.contains, "function")),
    Modernizr.addTest("generators", function () {
      try {
        new Function("function* test() {}")();
      } catch (e) {
        return !1;
      }
      return !0;
    }),
    Modernizr.addTest(
      "es6number",
      !!(
        Number.isFinite &&
        Number.isInteger &&
        Number.isSafeInteger &&
        Number.isNaN &&
        Number.parseInt &&
        Number.parseFloat &&
        Number.isInteger(Number.MAX_SAFE_INTEGER) &&
        Number.isInteger(Number.MIN_SAFE_INTEGER) &&
        Number.isFinite(Number.EPSILON)
      )
    ),
    Modernizr.addTest(
      "es6math",
      !!(
        Math &&
        Math.clz32 &&
        Math.cbrt &&
        Math.imul &&
        Math.sign &&
        Math.log10 &&
        Math.log2 &&
        Math.log1p &&
        Math.expm1 &&
        Math.cosh &&
        Math.sinh &&
        Math.tanh &&
        Math.acosh &&
        Math.asinh &&
        Math.atanh &&
        Math.hypot &&
        Math.trunc &&
        Math.fround
      )
    ),
    Modernizr.addTest(
      "es6object",
      !!(Object.assign && Object.is && Object.setPrototypeOf)
    ),
    Modernizr.addTest(
      "es6string",
      !!(
        String.fromCodePoint &&
        String.raw &&
        String.prototype.codePointAt &&
        String.prototype.repeat &&
        String.prototype.startsWith &&
        String.prototype.endsWith &&
        String.prototype.includes
      )
    ),
    Modernizr.addTest("promises", function () {
      return (
        "Promise" in window &&
        "resolve" in window.Promise &&
        "reject" in window.Promise &&
        "all" in window.Promise &&
        "race" in window.Promise &&
        (function () {
          var e;
          return (
            new window.Promise(function (n) {
              e = n;
            }),
            "function" == typeof e
          );
        })()
      );
    }),
    testRunner(),
    setClasses(classes),
    delete ModernizrProto.addTest,
    delete ModernizrProto.addAsyncTest;
  for (var i = 0; i < Modernizr._q.length; i++) Modernizr._q[i]();
  window.Modernizr = Modernizr;
})(window, document);

/**
 * Function that is used to check if the elements are not supported and if they are not,
 * the support.html file is opened which states that the browser does not support the following elements
 * 
 * @param {*} support needed to check if the following elements are supported
 */
function checkSupport(support){
    if(!support){
        window.location.href = 'support.html';
    }
}

//Window onload function that executed the function above and checks if es6 objects are supported
window.onload = () => {
    this.checkSupport(Modernizr.es6object);
}