/* PrismJS 1.25.0
https://prismjs.com/download.html#themes=prism-okaidia&languages=markup+css+clike+javascript+c+cpp+git+latex+makefile+matlab+powershell+python+sql+verilog+vhdl&plugins=toolbar+copy-to-clipboard+download-button */
var _self =
    "undefined" != typeof window
      ? window
      : "undefined" != typeof WorkerGlobalScope &&
        self instanceof WorkerGlobalScope
      ? self
      : {},
  Prism = (function (u) {
    var t = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,
      n = 0,
      e = {},
      M = {
        manual: u.Prism && u.Prism.manual,
        disableWorkerMessageHandler:
          u.Prism && u.Prism.disableWorkerMessageHandler,
        util: {
          encode: function e(n) {
            return n instanceof W
              ? new W(n.type, e(n.content), n.alias)
              : Array.isArray(n)
              ? n.map(e)
              : n
                  .replace(/&/g, "&amp;")
                  .replace(/</g, "&lt;")
                  .replace(/\u00a0/g, " ");
          },
          type: function (e) {
            return Object.prototype.toString.call(e).slice(8, -1);
          },
          objId: function (e) {
            return (
              e.__id || Object.defineProperty(e, "__id", { value: ++n }), e.__id
            );
          },
          clone: function t(e, r) {
            var a, n;
            switch (((r = r || {}), M.util.type(e))) {
              case "Object":
                if (((n = M.util.objId(e)), r[n])) return r[n];
                for (var i in ((a = {}), (r[n] = a), e))
                  e.hasOwnProperty(i) && (a[i] = t(e[i], r));
                return a;
              case "Array":
                return (
                  (n = M.util.objId(e)),
                  r[n]
                    ? r[n]
                    : ((a = []),
                      (r[n] = a),
                      e.forEach(function (e, n) {
                        a[n] = t(e, r);
                      }),
                      a)
                );
              default:
                return e;
            }
          },
          getLanguage: function (e) {
            for (; e; ) {
              var n = t.exec(e.className);
              if (n) return n[1].toLowerCase();
              e = e.parentElement;
            }
            return "none";
          },
          setLanguage: function (e, n) {
            (e.className = e.className.replace(RegExp(t, "gi"), "")),
              e.classList.add("language-" + n);
          },
          currentScript: function () {
            if ("undefined" == typeof document) return null;
            if ("currentScript" in document) return document.currentScript;
            try {
              throw new Error();
            } catch (e) {
              var n = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(e.stack) ||
                [])[1];
              if (n) {
                var t = document.getElementsByTagName("script");
                for (var r in t) if (t[r].src == n) return t[r];
              }
              return null;
            }
          },
          isActive: function (e, n, t) {
            for (var r = "no-" + n; e; ) {
              var a = e.classList;
              if (a.contains(n)) return !0;
              if (a.contains(r)) return !1;
              e = e.parentElement;
            }
            return !!t;
          },
        },
        languages: {
          plain: e,
          plaintext: e,
          text: e,
          txt: e,
          extend: function (e, n) {
            var t = M.util.clone(M.languages[e]);
            for (var r in n) t[r] = n[r];
            return t;
          },
          insertBefore: function (t, e, n, r) {
            var a = (r = r || M.languages)[t],
              i = {};
            for (var l in a)
              if (a.hasOwnProperty(l)) {
                if (l == e)
                  for (var o in n) n.hasOwnProperty(o) && (i[o] = n[o]);
                n.hasOwnProperty(l) || (i[l] = a[l]);
              }
            var s = r[t];
            return (
              (r[t] = i),
              M.languages.DFS(M.languages, function (e, n) {
                n === s && e != t && (this[e] = i);
              }),
              i
            );
          },
          DFS: function e(n, t, r, a) {
            a = a || {};
            var i = M.util.objId;
            for (var l in n)
              if (n.hasOwnProperty(l)) {
                t.call(n, l, n[l], r || l);
                var o = n[l],
                  s = M.util.type(o);
                "Object" !== s || a[i(o)]
                  ? "Array" !== s || a[i(o)] || ((a[i(o)] = !0), e(o, t, l, a))
                  : ((a[i(o)] = !0), e(o, t, null, a));
              }
          },
        },
        plugins: {},
        highlightAll: function (e, n) {
          M.highlightAllUnder(document, e, n);
        },
        highlightAllUnder: function (e, n, t) {
          var r = {
            callback: t,
            container: e,
            selector:
              'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code',
          };
          M.hooks.run("before-highlightall", r),
            (r.elements = Array.prototype.slice.apply(
              r.container.querySelectorAll(r.selector)
            )),
            M.hooks.run("before-all-elements-highlight", r);
          for (var a, i = 0; (a = r.elements[i++]); )
            M.highlightElement(a, !0 === n, r.callback);
        },
        highlightElement: function (e, n, t) {
          var r = M.util.getLanguage(e),
            a = M.languages[r];
          M.util.setLanguage(e, r);
          var i = e.parentElement;
          i && "pre" === i.nodeName.toLowerCase() && M.util.setLanguage(i, r);
          var l = { element: e, language: r, grammar: a, code: e.textContent };
          function o(e) {
            (l.highlightedCode = e),
              M.hooks.run("before-insert", l),
              (l.element.innerHTML = l.highlightedCode),
              M.hooks.run("after-highlight", l),
              M.hooks.run("complete", l),
              t && t.call(l.element);
          }
          if (
            (M.hooks.run("before-sanity-check", l),
            (i = l.element.parentElement) &&
              "pre" === i.nodeName.toLowerCase() &&
              !i.hasAttribute("tabindex") &&
              i.setAttribute("tabindex", "0"),
            !l.code)
          )
            return M.hooks.run("complete", l), void (t && t.call(l.element));
          if ((M.hooks.run("before-highlight", l), l.grammar))
            if (n && u.Worker) {
              var s = new Worker(M.filename);
              (s.onmessage = function (e) {
                o(e.data);
              }),
                s.postMessage(
                  JSON.stringify({
                    language: l.language,
                    code: l.code,
                    immediateClose: !0,
                  })
                );
            } else o(M.highlight(l.code, l.grammar, l.language));
          else o(M.util.encode(l.code));
        },
        highlight: function (e, n, t) {
          var r = { code: e, grammar: n, language: t };
          return (
            M.hooks.run("before-tokenize", r),
            (r.tokens = M.tokenize(r.code, r.grammar)),
            M.hooks.run("after-tokenize", r),
            W.stringify(M.util.encode(r.tokens), r.language)
          );
        },
        tokenize: function (e, n) {
          var t = n.rest;
          if (t) {
            for (var r in t) n[r] = t[r];
            delete n.rest;
          }
          var a = new i();
          return (
            I(a, a.head, e),
            (function e(n, t, r, a, i, l) {
              for (var o in r)
                if (r.hasOwnProperty(o) && r[o]) {
                  var s = r[o];
                  s = Array.isArray(s) ? s : [s];
                  for (var u = 0; u < s.length; ++u) {
                    if (l && l.cause == o + "," + u) return;
                    var c = s[u],
                      g = c.inside,
                      f = !!c.lookbehind,
                      h = !!c.greedy,
                      d = c.alias;
                    if (h && !c.pattern.global) {
                      var v = c.pattern.toString().match(/[imsuy]*$/)[0];
                      c.pattern = RegExp(c.pattern.source, v + "g");
                    }
                    for (
                      var p = c.pattern || c, m = a.next, y = i;
                      m !== t.tail && !(l && y >= l.reach);
                      y += m.value.length, m = m.next
                    ) {
                      var k = m.value;
                      if (t.length > n.length) return;
                      if (!(k instanceof W)) {
                        var x,
                          b = 1;
                        if (h) {
                          if (!(x = z(p, y, n, f)) || x.index >= n.length)
                            break;
                          var w = x.index,
                            A = x.index + x[0].length,
                            P = y;
                          for (P += m.value.length; P <= w; )
                            (m = m.next), (P += m.value.length);
                          if (
                            ((P -= m.value.length),
                            (y = P),
                            m.value instanceof W)
                          )
                            continue;
                          for (
                            var E = m;
                            E !== t.tail &&
                            (P < A || "string" == typeof E.value);
                            E = E.next
                          )
                            b++, (P += E.value.length);
                          b--, (k = n.slice(y, P)), (x.index -= y);
                        } else if (!(x = z(p, 0, k, f))) continue;
                        var w = x.index,
                          L = x[0],
                          S = k.slice(0, w),
                          O = k.slice(w + L.length),
                          j = y + k.length;
                        l && j > l.reach && (l.reach = j);
                        var C = m.prev;
                        S && ((C = I(t, C, S)), (y += S.length)), q(t, C, b);
                        var N = new W(o, g ? M.tokenize(L, g) : L, d, L);
                        if (((m = I(t, C, N)), O && I(t, m, O), 1 < b)) {
                          var _ = { cause: o + "," + u, reach: j };
                          e(n, t, r, m.prev, y, _),
                            l && _.reach > l.reach && (l.reach = _.reach);
                        }
                      }
                    }
                  }
                }
            })(e, a, n, a.head, 0),
            (function (e) {
              var n = [],
                t = e.head.next;
              for (; t !== e.tail; ) n.push(t.value), (t = t.next);
              return n;
            })(a)
          );
        },
        hooks: {
          all: {},
          add: function (e, n) {
            var t = M.hooks.all;
            (t[e] = t[e] || []), t[e].push(n);
          },
          run: function (e, n) {
            var t = M.hooks.all[e];
            if (t && t.length) for (var r, a = 0; (r = t[a++]); ) r(n);
          },
        },
        Token: W,
      };
    function W(e, n, t, r) {
      (this.type = e),
        (this.content = n),
        (this.alias = t),
        (this.length = 0 | (r || "").length);
    }
    function z(e, n, t, r) {
      e.lastIndex = n;
      var a = e.exec(t);
      if (a && r && a[1]) {
        var i = a[1].length;
        (a.index += i), (a[0] = a[0].slice(i));
      }
      return a;
    }
    function i() {
      var e = { value: null, prev: null, next: null },
        n = { value: null, prev: e, next: null };
      (e.next = n), (this.head = e), (this.tail = n), (this.length = 0);
    }
    function I(e, n, t) {
      var r = n.next,
        a = { value: t, prev: n, next: r };
      return (n.next = a), (r.prev = a), e.length++, a;
    }
    function q(e, n, t) {
      for (var r = n.next, a = 0; a < t && r !== e.tail; a++) r = r.next;
      ((n.next = r).prev = n), (e.length -= a);
    }
    if (
      ((u.Prism = M),
      (W.stringify = function n(e, t) {
        if ("string" == typeof e) return e;
        if (Array.isArray(e)) {
          var r = "";
          return (
            e.forEach(function (e) {
              r += n(e, t);
            }),
            r
          );
        }
        var a = {
            type: e.type,
            content: n(e.content, t),
            tag: "span",
            classes: ["token", e.type],
            attributes: {},
            language: t,
          },
          i = e.alias;
        i &&
          (Array.isArray(i)
            ? Array.prototype.push.apply(a.classes, i)
            : a.classes.push(i)),
          M.hooks.run("wrap", a);
        var l = "";
        for (var o in a.attributes)
          l +=
            " " +
            o +
            '="' +
            (a.attributes[o] || "").replace(/"/g, "&quot;") +
            '"';
        return (
          "<" +
          a.tag +
          ' class="' +
          a.classes.join(" ") +
          '"' +
          l +
          ">" +
          a.content +
          "</" +
          a.tag +
          ">"
        );
      }),
      !u.document)
    )
      return (
        u.addEventListener &&
          (M.disableWorkerMessageHandler ||
            u.addEventListener(
              "message",
              function (e) {
                var n = JSON.parse(e.data),
                  t = n.language,
                  r = n.code,
                  a = n.immediateClose;
                u.postMessage(M.highlight(r, M.languages[t], t)),
                  a && u.close();
              },
              !1
            )),
        M
      );
    var r = M.util.currentScript();
    function a() {
      M.manual || M.highlightAll();
    }
    if (
      (r &&
        ((M.filename = r.src),
        r.hasAttribute("data-manual") && (M.manual = !0)),
      !M.manual)
    ) {
      var l = document.readyState;
      "loading" === l || ("interactive" === l && r && r.defer)
        ? document.addEventListener("DOMContentLoaded", a)
        : window.requestAnimationFrame
        ? window.requestAnimationFrame(a)
        : window.setTimeout(a, 16);
    }
    return M;
  })(_self);
"undefined" != typeof module && module.exports && (module.exports = Prism),
  "undefined" != typeof global && (global.Prism = Prism);
(Prism.languages.markup = {
  comment: { pattern: /<!--(?:(?!<!--)[\s\S])*?-->/, greedy: !0 },
  prolog: { pattern: /<\?[\s\S]+?\?>/, greedy: !0 },
  doctype: {
    pattern:
      /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
    greedy: !0,
    inside: {
      "internal-subset": {
        pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
        lookbehind: !0,
        greedy: !0,
        inside: null,
      },
      string: { pattern: /"[^"]*"|'[^']*'/, greedy: !0 },
      punctuation: /^<!|>$|[[\]]/,
      "doctype-tag": /^DOCTYPE/i,
      name: /[^\s<>'"]+/,
    },
  },
  cdata: { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, greedy: !0 },
  tag: {
    pattern:
      /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
    greedy: !0,
    inside: {
      tag: {
        pattern: /^<\/?[^\s>\/]+/,
        inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ },
      },
      "special-attr": [],
      "attr-value": {
        pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
        inside: {
          punctuation: [{ pattern: /^=/, alias: "attr-equals" }, /"|'/],
        },
      },
      punctuation: /\/?>/,
      "attr-name": {
        pattern: /[^\s>\/]+/,
        inside: { namespace: /^[^\s>\/:]+:/ },
      },
    },
  },
  entity: [
    { pattern: /&[\da-z]{1,8};/i, alias: "named-entity" },
    /&#x?[\da-f]{1,8};/i,
  ],
}),
  (Prism.languages.markup.tag.inside["attr-value"].inside.entity =
    Prism.languages.markup.entity),
  (Prism.languages.markup.doctype.inside["internal-subset"].inside =
    Prism.languages.markup),
  Prism.hooks.add("wrap", function (a) {
    "entity" === a.type &&
      (a.attributes.title = a.content.replace(/&amp;/, "&"));
  }),
  Object.defineProperty(Prism.languages.markup.tag, "addInlined", {
    value: function (a, e) {
      var s = {};
      (s["language-" + e] = {
        pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
        lookbehind: !0,
        inside: Prism.languages[e],
      }),
        (s.cdata = /^<!\[CDATA\[|\]\]>$/i);
      var t = {
        "included-cdata": { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, inside: s },
      };
      t["language-" + e] = { pattern: /[\s\S]+/, inside: Prism.languages[e] };
      var n = {};
      (n[a] = {
        pattern: RegExp(
          "(<__[^>]*>)(?:<!\\[CDATA\\[(?:[^\\]]|\\](?!\\]>))*\\]\\]>|(?!<!\\[CDATA\\[)[^])*?(?=</__>)".replace(
            /__/g,
            function () {
              return a;
            }
          ),
          "i"
        ),
        lookbehind: !0,
        greedy: !0,
        inside: t,
      }),
        Prism.languages.insertBefore("markup", "cdata", n);
    },
  }),
  Object.defineProperty(Prism.languages.markup.tag, "addAttribute", {
    value: function (a, e) {
      Prism.languages.markup.tag.inside["special-attr"].push({
        pattern: RegExp(
          "(^|[\"'\\s])(?:" +
            a +
            ")\\s*=\\s*(?:\"[^\"]*\"|'[^']*'|[^\\s'\">=]+(?=[\\s>]))",
          "i"
        ),
        lookbehind: !0,
        inside: {
          "attr-name": /^[^\s=]+/,
          "attr-value": {
            pattern: /=[\s\S]+/,
            inside: {
              value: {
                pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
                lookbehind: !0,
                alias: [e, "language-" + e],
                inside: Prism.languages[e],
              },
              punctuation: [{ pattern: /^=/, alias: "attr-equals" }, /"|'/],
            },
          },
        },
      });
    },
  }),
  (Prism.languages.html = Prism.languages.markup),
  (Prism.languages.mathml = Prism.languages.markup),
  (Prism.languages.svg = Prism.languages.markup),
  (Prism.languages.xml = Prism.languages.extend("markup", {})),
  (Prism.languages.ssml = Prism.languages.xml),
  (Prism.languages.atom = Prism.languages.xml),
  (Prism.languages.rss = Prism.languages.xml);
!(function (s) {
  var e =
    /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
  (s.languages.css = {
    comment: /\/\*[\s\S]*?\*\//,
    atrule: {
      pattern: /@[\w-](?:[^;{\s]|\s+(?![\s{]))*(?:;|(?=\s*\{))/,
      inside: {
        rule: /^@[\w-]+/,
        "selector-function-argument": {
          pattern:
            /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
          lookbehind: !0,
          alias: "selector",
        },
        keyword: {
          pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
          lookbehind: !0,
        },
      },
    },
    url: {
      pattern: RegExp(
        "\\burl\\((?:" + e.source + "|(?:[^\\\\\r\n()\"']|\\\\[^])*)\\)",
        "i"
      ),
      greedy: !0,
      inside: {
        function: /^url/i,
        punctuation: /^\(|\)$/,
        string: { pattern: RegExp("^" + e.source + "$"), alias: "url" },
      },
    },
    selector: {
      pattern: RegExp(
        "(^|[{}\\s])[^{}\\s](?:[^{};\"'\\s]|\\s+(?![\\s{])|" +
          e.source +
          ")*(?=\\s*\\{)"
      ),
      lookbehind: !0,
    },
    string: { pattern: e, greedy: !0 },
    property: {
      pattern:
        /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
      lookbehind: !0,
    },
    important: /!important\b/i,
    function: { pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i, lookbehind: !0 },
    punctuation: /[(){};:,]/,
  }),
    (s.languages.css.atrule.inside.rest = s.languages.css);
  var t = s.languages.markup;
  t && (t.tag.addInlined("style", "css"), t.tag.addAttribute("style", "css"));
})(Prism);
Prism.languages.clike = {
  comment: [
    { pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: !0, greedy: !0 },
    { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 },
  ],
  string: {
    pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: !0,
  },
  "class-name": {
    pattern:
      /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
    lookbehind: !0,
    inside: { punctuation: /[.\\]/ },
  },
  keyword:
    /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
  boolean: /\b(?:false|true)\b/,
  function: /\b\w+(?=\()/,
  number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
  operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
  punctuation: /[{}[\];(),.:]/,
};
(Prism.languages.javascript = Prism.languages.extend("clike", {
  "class-name": [
    Prism.languages.clike["class-name"],
    {
      pattern:
        /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
      lookbehind: !0,
    },
  ],
  keyword: [
    { pattern: /((?:^|\})\s*)catch\b/, lookbehind: !0 },
    {
      pattern:
        /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
      lookbehind: !0,
    },
  ],
  function:
    /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
  number: {
    pattern: RegExp(
      "(^|[^\\w$])(?:NaN|Infinity|0[bB][01]+(?:_[01]+)*n?|0[oO][0-7]+(?:_[0-7]+)*n?|0[xX][\\dA-Fa-f]+(?:_[\\dA-Fa-f]+)*n?|\\d+(?:_\\d+)*n|(?:\\d+(?:_\\d+)*(?:\\.(?:\\d+(?:_\\d+)*)?)?|\\.\\d+(?:_\\d+)*)(?:[Ee][+-]?\\d+(?:_\\d+)*)?)(?![\\w$])"
    ),
    lookbehind: !0,
  },
  operator:
    /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/,
})),
  (Prism.languages.javascript["class-name"][0].pattern =
    /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/),
  Prism.languages.insertBefore("javascript", "keyword", {
    regex: {
      pattern:
        /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,
      lookbehind: !0,
      greedy: !0,
      inside: {
        "regex-source": {
          pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
          lookbehind: !0,
          alias: "language-regex",
          inside: Prism.languages.regex,
        },
        "regex-delimiter": /^\/|\/$/,
        "regex-flags": /^[a-z]+$/,
      },
    },
    "function-variable": {
      pattern:
        /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
      alias: "function",
    },
    parameter: [
      {
        pattern:
          /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
        lookbehind: !0,
        inside: Prism.languages.javascript,
      },
      {
        pattern:
          /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
        lookbehind: !0,
        inside: Prism.languages.javascript,
      },
      {
        pattern:
          /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
        lookbehind: !0,
        inside: Prism.languages.javascript,
      },
      {
        pattern:
          /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
        lookbehind: !0,
        inside: Prism.languages.javascript,
      },
    ],
    constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/,
  }),
  Prism.languages.insertBefore("javascript", "string", {
    hashbang: { pattern: /^#!.*/, greedy: !0, alias: "comment" },
    "template-string": {
      pattern:
        /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
      greedy: !0,
      inside: {
        "template-punctuation": { pattern: /^`|`$/, alias: "string" },
        interpolation: {
          pattern:
            /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
          lookbehind: !0,
          inside: {
            "interpolation-punctuation": {
              pattern: /^\$\{|\}$/,
              alias: "punctuation",
            },
            rest: Prism.languages.javascript,
          },
        },
        string: /[\s\S]+/,
      },
    },
    "string-property": {
      pattern:
        /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
      lookbehind: !0,
      greedy: !0,
      alias: "property",
    },
  }),
  Prism.languages.insertBefore("javascript", "operator", {
    "literal-property": {
      pattern:
        /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
      lookbehind: !0,
      alias: "property",
    },
  }),
  Prism.languages.markup &&
    (Prism.languages.markup.tag.addInlined("script", "javascript"),
    Prism.languages.markup.tag.addAttribute(
      "on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)",
      "javascript"
    )),
  (Prism.languages.js = Prism.languages.javascript);
(Prism.languages.c = Prism.languages.extend("clike", {
  comment: {
    pattern:
      /\/\/(?:[^\r\n\\]|\\(?:\r\n?|\n|(?![\r\n])))*|\/\*[\s\S]*?(?:\*\/|$)/,
    greedy: !0,
  },
  string: { pattern: /"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"/, greedy: !0 },
  "class-name": {
    pattern:
      /(\b(?:enum|struct)\s+(?:__attribute__\s*\(\([\s\S]*?\)\)\s*)?)\w+|\b[a-z]\w*_t\b/,
    lookbehind: !0,
  },
  keyword:
    /\b(?:_Alignas|_Alignof|_Atomic|_Bool|_Complex|_Generic|_Imaginary|_Noreturn|_Static_assert|_Thread_local|__attribute__|asm|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|inline|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|typeof|union|unsigned|void|volatile|while)\b/,
  function: /\b[a-z_]\w*(?=\s*\()/i,
  number:
    /(?:\b0x(?:[\da-f]+(?:\.[\da-f]*)?|\.[\da-f]+)(?:p[+-]?\d+)?|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?)[ful]{0,4}/i,
  operator: />>=?|<<=?|->|([-+&|:])\1|[?:~]|[-+*/%&|^!=<>]=?/,
})),
  Prism.languages.insertBefore("c", "string", {
    char: { pattern: /'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n]){0,32}'/, greedy: !0 },
  }),
  Prism.languages.insertBefore("c", "string", {
    macro: {
      pattern:
        /(^[\t ]*)#\s*[a-z](?:[^\r\n\\/]|\/(?!\*)|\/\*(?:[^*]|\*(?!\/))*\*\/|\\(?:\r\n|[\s\S]))*/im,
      lookbehind: !0,
      greedy: !0,
      alias: "property",
      inside: {
        string: [
          { pattern: /^(#\s*include\s*)<[^>]+>/, lookbehind: !0 },
          Prism.languages.c.string,
        ],
        char: Prism.languages.c.char,
        comment: Prism.languages.c.comment,
        "macro-name": [
          { pattern: /(^#\s*define\s+)\w+\b(?!\()/i, lookbehind: !0 },
          {
            pattern: /(^#\s*define\s+)\w+\b(?=\()/i,
            lookbehind: !0,
            alias: "function",
          },
        ],
        directive: {
          pattern: /^(#\s*)[a-z]+/,
          lookbehind: !0,
          alias: "keyword",
        },
        "directive-hash": /^#/,
        punctuation: /##|\\(?=[\r\n])/,
        expression: { pattern: /\S[\s\S]*/, inside: Prism.languages.c },
      },
    },
  }),
  Prism.languages.insertBefore("c", "function", {
    constant:
      /\b(?:EOF|NULL|SEEK_CUR|SEEK_END|SEEK_SET|__DATE__|__FILE__|__LINE__|__TIMESTAMP__|__TIME__|__func__|stderr|stdin|stdout)\b/,
  }),
  delete Prism.languages.c.boolean;
!(function (e) {
  var t =
      /\b(?:alignas|alignof|asm|auto|bool|break|case|catch|char|char16_t|char32_t|char8_t|class|co_await|co_return|co_yield|compl|concept|const|const_cast|consteval|constexpr|constinit|continue|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|final|float|for|friend|goto|if|import|inline|int|int16_t|int32_t|int64_t|int8_t|long|module|mutable|namespace|new|noexcept|nullptr|operator|override|private|protected|public|register|reinterpret_cast|requires|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|uint16_t|uint32_t|uint64_t|uint8_t|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/,
    n = "\\b(?!<keyword>)\\w+(?:\\s*\\.\\s*\\w+)*\\b".replace(
      /<keyword>/g,
      function () {
        return t.source;
      }
    );
  (e.languages.cpp = e.languages.extend("c", {
    "class-name": [
      {
        pattern: RegExp(
          "(\\b(?:class|concept|enum|struct|typename)\\s+)(?!<keyword>)\\w+".replace(
            /<keyword>/g,
            function () {
              return t.source;
            }
          )
        ),
        lookbehind: !0,
      },
      /\b[A-Z]\w*(?=\s*::\s*\w+\s*\()/,
      /\b[A-Z_]\w*(?=\s*::\s*~\w+\s*\()/i,
      /\b\w+(?=\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>\s*::\s*\w+\s*\()/,
    ],
    keyword: t,
    number: {
      pattern:
        /(?:\b0b[01']+|\b0x(?:[\da-f']+(?:\.[\da-f']*)?|\.[\da-f']+)(?:p[+-]?[\d']+)?|(?:\b[\d']+(?:\.[\d']*)?|\B\.[\d']+)(?:e[+-]?[\d']+)?)[ful]{0,4}/i,
      greedy: !0,
    },
    operator:
      />>=?|<<=?|->|--|\+\+|&&|\|\||[?:~]|<=>|[-+*/%&|^!=<>]=?|\b(?:and|and_eq|bitand|bitor|not|not_eq|or|or_eq|xor|xor_eq)\b/,
    boolean: /\b(?:false|true)\b/,
  })),
    e.languages.insertBefore("cpp", "string", {
      module: {
        pattern: RegExp(
          '(\\b(?:import|module)\\s+)(?:"(?:\\\\(?:\r\n|[^])|[^"\\\\\r\n])*"|<[^<>\r\n]*>|' +
            "<mod-name>(?:\\s*:\\s*<mod-name>)?|:\\s*<mod-name>".replace(
              /<mod-name>/g,
              function () {
                return n;
              }
            ) +
            ")"
        ),
        lookbehind: !0,
        greedy: !0,
        inside: { string: /^[<"][\s\S]+/, operator: /:/, punctuation: /\./ },
      },
      "raw-string": {
        pattern: /R"([^()\\ ]{0,16})\([\s\S]*?\)\1"/,
        alias: "string",
        greedy: !0,
      },
    }),
    e.languages.insertBefore("cpp", "keyword", {
      "generic-function": {
        pattern: /\b(?!operator\b)[a-z_]\w*\s*<(?:[^<>]|<[^<>]*>)*>(?=\s*\()/i,
        inside: {
          function: /^\w+/,
          generic: {
            pattern: /<[\s\S]+/,
            alias: "class-name",
            inside: e.languages.cpp,
          },
        },
      },
    }),
    e.languages.insertBefore("cpp", "operator", {
      "double-colon": { pattern: /::/, alias: "punctuation" },
    }),
    e.languages.insertBefore("cpp", "class-name", {
      "base-clause": {
        pattern:
          /(\b(?:class|struct)\s+\w+\s*:\s*)[^;{}"'\s]+(?:\s+[^;{}"'\s]+)*(?=\s*[;{])/,
        lookbehind: !0,
        greedy: !0,
        inside: e.languages.extend("cpp", {}),
      },
    }),
    e.languages.insertBefore(
      "inside",
      "double-colon",
      { "class-name": /\b[a-z_]\w*\b(?!\s*::)/i },
      e.languages.cpp["base-clause"]
    );
})(Prism);
Prism.languages.git = {
  comment: /^#.*/m,
  deleted: /^[-–].*/m,
  inserted: /^\+.*/m,
  string: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/,
  command: { pattern: /^.*\$ git .*$/m, inside: { parameter: /\s--?\w+/ } },
  coord: /^@@.*@@$/m,
  "commit-sha1": /^commit \w{40}$/m,
};
!(function (a) {
  var e = /\\(?:[^a-z()[\]]|[a-z*]+)/i,
    n = { "equation-command": { pattern: e, alias: "regex" } };
  (a.languages.latex = {
    comment: /%.*/,
    cdata: {
      pattern:
        /(\\begin\{((?:lstlisting|verbatim)\*?)\})[\s\S]*?(?=\\end\{\2\})/,
      lookbehind: !0,
    },
    equation: [
      {
        pattern:
          /\$\$(?:\\[\s\S]|[^\\$])+\$\$|\$(?:\\[\s\S]|[^\\$])+\$|\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\]/,
        inside: n,
        alias: "string",
      },
      {
        pattern:
          /(\\begin\{((?:align|eqnarray|equation|gather|math|multline)\*?)\})[\s\S]*?(?=\\end\{\2\})/,
        lookbehind: !0,
        inside: n,
        alias: "string",
      },
    ],
    keyword: {
      pattern:
        /(\\(?:begin|cite|documentclass|end|label|ref|usepackage)(?:\[[^\]]+\])?\{)[^}]+(?=\})/,
      lookbehind: !0,
    },
    url: { pattern: /(\\url\{)[^}]+(?=\})/, lookbehind: !0 },
    headline: {
      pattern:
        /(\\(?:chapter|frametitle|paragraph|part|section|subparagraph|subsection|subsubparagraph|subsubsection|subsubsubparagraph)\*?(?:\[[^\]]+\])?\{)[^}]+(?=\})/,
      lookbehind: !0,
      alias: "class-name",
    },
    function: { pattern: e, alias: "selector" },
    punctuation: /[[\]{}&]/,
  }),
    (a.languages.tex = a.languages.latex),
    (a.languages.context = a.languages.latex);
})(Prism);
Prism.languages.makefile = {
  comment: {
    pattern: /(^|[^\\])#(?:\\(?:\r\n|[\s\S])|[^\\\r\n])*/,
    lookbehind: !0,
  },
  string: {
    pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: !0,
  },
  "builtin-target": {
    pattern: /\.[A-Z][^:#=\s]+(?=\s*:(?!=))/,
    alias: "builtin",
  },
  target: {
    pattern: /^(?:[^:=\s]|[ \t]+(?![\s:]))+(?=\s*:(?!=))/m,
    alias: "symbol",
    inside: { variable: /\$+(?:(?!\$)[^(){}:#=\s]+|(?=[({]))/ },
  },
  variable: /\$+(?:(?!\$)[^(){}:#=\s]+|\([@*%<^+?][DF]\)|(?=[({]))/,
  keyword:
    /-include\b|\b(?:define|else|endef|endif|export|ifn?def|ifn?eq|include|override|private|sinclude|undefine|unexport|vpath)\b/,
  function: {
    pattern:
      /(\()(?:abspath|addsuffix|and|basename|call|dir|error|eval|file|filter(?:-out)?|findstring|firstword|flavor|foreach|guile|if|info|join|lastword|load|notdir|or|origin|patsubst|realpath|shell|sort|strip|subst|suffix|value|warning|wildcard|word(?:list|s)?)(?=[ \t])/,
    lookbehind: !0,
  },
  operator: /(?:::|[?:+!])?=|[|@]/,
  punctuation: /[:;(){}]/,
};
Prism.languages.matlab = {
  comment: [/%\{[\s\S]*?\}%/, /%.+/],
  string: { pattern: /\B'(?:''|[^'\r\n])*'/, greedy: !0 },
  number: /(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[eE][+-]?\d+)?(?:[ij])?|\b[ij]\b/,
  keyword:
    /\b(?:NaN|break|case|catch|continue|else|elseif|end|for|function|if|inf|otherwise|parfor|pause|pi|return|switch|try|while)\b/,
  function: /\b(?!\d)\w+(?=\s*\()/,
  operator: /\.?[*^\/\\']|[+\-:@]|[<>=~]=?|&&?|\|\|?/,
  punctuation: /\.{3}|[.,;\[\](){}!]/,
};
!(function (e) {
  var i = (Prism.languages.powershell = {
    comment: [
      { pattern: /(^|[^`])<#[\s\S]*?#>/, lookbehind: !0 },
      { pattern: /(^|[^`])#.*/, lookbehind: !0 },
    ],
    string: [
      { pattern: /"(?:`[\s\S]|[^`"])*"/, greedy: !0, inside: null },
      { pattern: /'(?:[^']|'')*'/, greedy: !0 },
    ],
    namespace: /\[[a-z](?:\[(?:\[[^\]]*\]|[^\[\]])*\]|[^\[\]])*\]/i,
    boolean: /\$(?:false|true)\b/i,
    variable: /\$\w+\b/,
    function: [
      /\b(?:Add|Approve|Assert|Backup|Block|Checkpoint|Clear|Close|Compare|Complete|Compress|Confirm|Connect|Convert|ConvertFrom|ConvertTo|Copy|Debug|Deny|Disable|Disconnect|Dismount|Edit|Enable|Enter|Exit|Expand|Export|Find|ForEach|Format|Get|Grant|Group|Hide|Import|Initialize|Install|Invoke|Join|Limit|Lock|Measure|Merge|Move|New|Open|Optimize|Out|Ping|Pop|Protect|Publish|Push|Read|Receive|Redo|Register|Remove|Rename|Repair|Request|Reset|Resize|Resolve|Restart|Restore|Resume|Revoke|Save|Search|Select|Send|Set|Show|Skip|Sort|Split|Start|Step|Stop|Submit|Suspend|Switch|Sync|Tee|Test|Trace|Unblock|Undo|Uninstall|Unlock|Unprotect|Unpublish|Unregister|Update|Use|Wait|Watch|Where|Write)-[a-z]+\b/i,
      /\b(?:ac|cat|chdir|clc|cli|clp|clv|compare|copy|cp|cpi|cpp|cvpa|dbp|del|diff|dir|ebp|echo|epal|epcsv|epsn|erase|fc|fl|ft|fw|gal|gbp|gc|gci|gcs|gdr|gi|gl|gm|gp|gps|group|gsv|gu|gv|gwmi|iex|ii|ipal|ipcsv|ipsn|irm|iwmi|iwr|kill|lp|ls|measure|mi|mount|move|mp|mv|nal|ndr|ni|nv|ogv|popd|ps|pushd|pwd|rbp|rd|rdr|ren|ri|rm|rmdir|rni|rnp|rp|rv|rvpa|rwmi|sal|saps|sasv|sbp|sc|select|set|shcm|si|sl|sleep|sls|sort|sp|spps|spsv|start|sv|swmi|tee|trcm|type|write)\b/i,
    ],
    keyword:
      /\b(?:Begin|Break|Catch|Class|Continue|Data|Define|Do|DynamicParam|Else|ElseIf|End|Exit|Filter|Finally|For|ForEach|From|Function|If|InlineScript|Parallel|Param|Process|Return|Sequence|Switch|Throw|Trap|Try|Until|Using|Var|While|Workflow)\b/i,
    operator: {
      pattern:
        /(^|\W)(?:!|-(?:b?(?:and|x?or)|as|(?:Not)?(?:Contains|In|Like|Match)|eq|ge|gt|is(?:Not)?|Join|le|lt|ne|not|Replace|sh[lr])\b|-[-=]?|\+[+=]?|[*\/%]=?)/i,
      lookbehind: !0,
    },
    punctuation: /[|{}[\];(),.]/,
  });
  i.string[0].inside = {
    function: {
      pattern: /(^|[^`])\$\((?:\$\([^\r\n()]*\)|(?!\$\()[^\r\n)])*\)/,
      lookbehind: !0,
      inside: i,
    },
    boolean: i.boolean,
    variable: i.variable,
  };
})();
(Prism.languages.python = {
  comment: { pattern: /(^|[^\\])#.*/, lookbehind: !0, greedy: !0 },
  "string-interpolation": {
    pattern:
      /(?:f|fr|rf)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,
    greedy: !0,
    inside: {
      interpolation: {
        pattern:
          /((?:^|[^{])(?:\{\{)*)\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}])+\})+\})+\}/,
        lookbehind: !0,
        inside: {
          "format-spec": { pattern: /(:)[^:(){}]+(?=\}$)/, lookbehind: !0 },
          "conversion-option": {
            pattern: /![sra](?=[:}]$)/,
            alias: "punctuation",
          },
          rest: null,
        },
      },
      string: /[\s\S]+/,
    },
  },
  "triple-quoted-string": {
    pattern: /(?:[rub]|br|rb)?("""|''')[\s\S]*?\1/i,
    greedy: !0,
    alias: "string",
  },
  string: {
    pattern: /(?:[rub]|br|rb)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,
    greedy: !0,
  },
  function: {
    pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,
    lookbehind: !0,
  },
  "class-name": { pattern: /(\bclass\s+)\w+/i, lookbehind: !0 },
  decorator: {
    pattern: /(^[\t ]*)@\w+(?:\.\w+)*/m,
    lookbehind: !0,
    alias: ["annotation", "punctuation"],
    inside: { punctuation: /\./ },
  },
  keyword:
    /\b(?:_(?=\s*:)|and|as|assert|async|await|break|case|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|match|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,
  builtin:
    /\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,
  boolean: /\b(?:False|None|True)\b/,
  number:
    /\b0(?:b(?:_?[01])+|o(?:_?[0-7])+|x(?:_?[a-f0-9])+)\b|(?:\b\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\B\.\d+(?:_\d+)*)(?:e[+-]?\d+(?:_\d+)*)?j?(?!\w)/i,
  operator: /[-+%=]=?|!=|:=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,
  punctuation: /[{}[\];(),.:]/,
}),
  (Prism.languages.python[
    "string-interpolation"
  ].inside.interpolation.inside.rest = Prism.languages.python),
  (Prism.languages.py = Prism.languages.python);
Prism.languages.sql = {
  comment: {
    pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:--|\/\/|#).*)/,
    lookbehind: !0,
  },
  variable: [
    { pattern: /@(["'`])(?:\\[\s\S]|(?!\1)[^\\])+\1/, greedy: !0 },
    /@[\w.$]+/,
  ],
  string: {
    pattern: /(^|[^@\\])("|')(?:\\[\s\S]|(?!\2)[^\\]|\2\2)*\2/,
    greedy: !0,
    lookbehind: !0,
  },
  identifier: {
    pattern: /(^|[^@\\])`(?:\\[\s\S]|[^`\\]|``)*`/,
    greedy: !0,
    lookbehind: !0,
    inside: { punctuation: /^`|`$/ },
  },
  function:
    /\b(?:AVG|COUNT|FIRST|FORMAT|LAST|LCASE|LEN|MAX|MID|MIN|MOD|NOW|ROUND|SUM|UCASE)(?=\s*\()/i,
  keyword:
    /\b(?:ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|AUTO_INCREMENT|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR(?:ACTER|SET)?|CHECK(?:POINT)?|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMNS?|COMMENT|COMMIT(?:TED)?|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS(?:TABLE)?|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|CYCLE|DATA(?:BASES?)?|DATE(?:TIME)?|DAY|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DELIMITERS?|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE|ELSE(?:IF)?|ENABLE|ENCLOSED|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPED?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|HOUR|IDENTITY(?:COL|_INSERT)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTERVAL|INTO|INVOKER|ISOLATION|ITERATE|JOIN|KEYS?|KILL|LANGUAGE|LAST|LEAVE|LEFT|LEVEL|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|LOOP|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MINUTE|MODE|MODIFIES|MODIFY|MONTH|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL|NATURAL|NCHAR|NEXT|NO|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREPARE|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READS?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEAT(?:ABLE)?|REPLACE|REPLICATION|REQUIRE|RESIGNAL|RESTORE|RESTRICT|RETURN(?:ING|S)?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SECOND|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|SQL|START(?:ING)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED|TEXT(?:SIZE)?|THEN|TIME(?:STAMP)?|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNLOCK|UNPIVOT|UNSIGNED|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?|YEAR)\b/i,
  boolean: /\b(?:FALSE|NULL|TRUE)\b/i,
  number: /\b0x[\da-f]+\b|\b\d+(?:\.\d*)?|\B\.\d+\b/i,
  operator:
    /[-+*\/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|DIV|ILIKE|IN|IS|LIKE|NOT|OR|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/i,
  punctuation: /[;[\]()`,.]/,
};
Prism.languages.verilog = {
  comment: { pattern: /\/\/.*|\/\*[\s\S]*?\*\//, greedy: !0 },
  string: { pattern: /"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"/, greedy: !0 },
  "kernel-function": { pattern: /\B\$\w+\b/, alias: "property" },
  constant: /\B`\w+\b/,
  function: /\b\w+(?=\()/,
  keyword:
    /\b(?:alias|and|assert|assign|assume|automatic|before|begin|bind|bins|binsof|bit|break|buf|bufif0|bufif1|byte|case|casex|casez|cell|chandle|class|clocking|cmos|config|const|constraint|context|continue|cover|covergroup|coverpoint|cross|deassign|default|defparam|design|disable|dist|do|edge|else|end|endcase|endclass|endclocking|endconfig|endfunction|endgenerate|endgroup|endinterface|endmodule|endpackage|endprimitive|endprogram|endproperty|endsequence|endspecify|endtable|endtask|enum|event|expect|export|extends|extern|final|first_match|for|force|foreach|forever|fork|forkjoin|function|generate|genvar|highz0|highz1|if|iff|ifnone|ignore_bins|illegal_bins|import|incdir|include|initial|inout|input|inside|instance|int|integer|interface|intersect|join|join_any|join_none|large|liblist|library|local|localparam|logic|longint|macromodule|matches|medium|modport|module|nand|negedge|new|nmos|nor|noshowcancelled|not|notif0|notif1|null|or|output|package|packed|parameter|pmos|posedge|primitive|priority|program|property|protected|pull0|pull1|pulldown|pullup|pulsestyle_ondetect|pulsestyle_onevent|pure|rand|randc|randcase|randsequence|rcmos|real|realtime|ref|reg|release|repeat|return|rnmos|rpmos|rtran|rtranif0|rtranif1|scalared|sequence|shortint|shortreal|showcancelled|signed|small|solve|specify|specparam|static|string|strong0|strong1|struct|super|supply0|supply1|table|tagged|task|this|throughout|time|timeprecision|timeunit|tran|tranif0|tranif1|tri|tri0|tri1|triand|trior|trireg|type|typedef|union|unique|unsigned|use|uwire|var|vectored|virtual|void|wait|wait_order|wand|weak0|weak1|while|wildcard|wire|with|within|wor|xnor|xor)\b/,
  important: /\b(?:always|always_comb|always_ff|always_latch)\b(?: *@)?/,
  number:
    /\B##?\d+|(?:\b\d+)?'[odbh] ?[\da-fzx_?]+|\b(?:\d*[._])?\d+(?:e[-+]?\d+)?/i,
  operator: /[-+{}^~%*\/?=!<>&|]+/,
  punctuation: /[[\];(),.:]/,
};
Prism.languages.vhdl = {
  comment: /--.+/,
  "vhdl-vectors": {
    pattern: /\b[oxb]"[\da-f_]+"|"[01uxzwlh-]+"/i,
    alias: "number",
  },
  "quoted-function": { pattern: /"\S+?"(?=\()/, alias: "function" },
  string: /"(?:[^\\"\r\n]|\\(?:\r\n|[\s\S]))*"/,
  constant: /\b(?:library|use)\b/i,
  keyword:
    /\b(?:'active|'ascending|'base|'delayed|'driving|'driving_value|'event|'high|'image|'instance_name|'last_active|'last_event|'last_value|'left|'leftof|'length|'low|'path_name|'pos|'pred|'quiet|'range|'reverse_range|'right|'rightof|'simple_name|'stable|'succ|'transaction|'val|'value|access|after|alias|all|architecture|array|assert|attribute|begin|block|body|buffer|bus|case|component|configuration|constant|disconnect|downto|else|elsif|end|entity|exit|file|for|function|generate|generic|group|guarded|if|impure|in|inertial|inout|is|label|library|linkage|literal|loop|map|new|next|null|of|on|open|others|out|package|port|postponed|procedure|process|pure|range|record|register|reject|report|return|select|severity|shared|signal|subtype|then|to|transport|type|unaffected|units|until|use|variable|wait|when|while|with)\b/i,
  boolean: /\b(?:false|true)\b/i,
  function: /\w+(?=\()/,
  number: /'[01uxzwlh-]'|\b(?:\d+#[\da-f_.]+#|\d[\d_.]*)(?:e[-+]?\d+)?/i,
  operator:
    /[<>]=?|:=|[-+*/&=]|\b(?:abs|and|mod|nand|nor|not|or|rem|rol|ror|sla|sll|sra|srl|xnor|xor)\b/i,
  punctuation: /[{}[\];(),.:]/,
};
!(function () {
  if ("undefined" != typeof Prism && "undefined" != typeof document) {
    var i = [],
      l = {},
      d = function () {};
    Prism.plugins.toolbar = {};
    var e = (Prism.plugins.toolbar.registerButton = function (e, n) {
        var t;
        (t =
          "function" == typeof n
            ? n
            : function (e) {
                var t;
                return (
                  "function" == typeof n.onClick
                    ? (((t = document.createElement("button")).type = "button"),
                      t.addEventListener("click", function () {
                        n.onClick.call(this, e);
                      }))
                    : "string" == typeof n.url
                    ? ((t = document.createElement("a")).href = n.url)
                    : (t = document.createElement("span")),
                  n.className && t.classList.add(n.className),
                  (t.textContent = n.text),
                  t
                );
              }),
          e in l
            ? console.warn(
                'There is a button with the key "' + e + '" registered already.'
              )
            : i.push((l[e] = t));
      }),
      t = (Prism.plugins.toolbar.hook = function (a) {
        var e = a.element.parentNode;
        if (
          e &&
          /pre/i.test(e.nodeName) &&
          !e.parentNode.classList.contains("code-toolbar")
        ) {
          var t = document.createElement("div");
          t.classList.add("code-toolbar"),
            e.parentNode.insertBefore(t, e),
            t.appendChild(e);
          var r = document.createElement("div");
          r.classList.add("toolbar");
          var n = i,
            o = (function (e) {
              for (; e; ) {
                var t = e.getAttribute("data-toolbar-order");
                if (null != t)
                  return (t = t.trim()).length ? t.split(/\s*,\s*/g) : [];
                e = e.parentElement;
              }
            })(a.element);
          o &&
            (n = o.map(function (e) {
              return l[e] || d;
            })),
            n.forEach(function (e) {
              var t = e(a);
              if (t) {
                var n = document.createElement("div");
                n.classList.add("toolbar-item"),
                  n.appendChild(t),
                  r.appendChild(n);
              }
            }),
            t.appendChild(r);
        }
      });
    e("label", function (e) {
      var t = e.element.parentNode;
      if (t && /pre/i.test(t.nodeName) && t.hasAttribute("data-label")) {
        var n,
          a,
          r = t.getAttribute("data-label");
        try {
          a = document.querySelector("template#" + r);
        } catch (e) {}
        return (
          a
            ? (n = a.content)
            : (t.hasAttribute("data-url")
                ? ((n = document.createElement("a")).href =
                    t.getAttribute("data-url"))
                : (n = document.createElement("span")),
              (n.textContent = r)),
          n
        );
      }
    }),
      Prism.hooks.add("complete", t);
  }
})();
!(function () {
  function u(t, e) {
    t.addEventListener("click", function () {
      !(function (t) {
        navigator.clipboard
          ? navigator.clipboard
              .writeText(t.getText())
              .then(t.success, function () {
                o(t);
              })
          : o(t);
      })(e);
    });
  }
  function o(e) {
    var t = document.createElement("textarea");
    (t.value = e.getText()),
      (t.style.top = "0"),
      (t.style.left = "0"),
      (t.style.position = "fixed"),
      document.body.appendChild(t),
      t.focus(),
      t.select();
    try {
      var o = document.execCommand("copy");
      setTimeout(function () {
        o ? e.success() : e.error();
      }, 1);
    } catch (t) {
      setTimeout(function () {
        e.error(t);
      }, 1);
    }
    document.body.removeChild(t);
  }
  "undefined" != typeof Prism &&
    "undefined" != typeof document &&
    (Prism.plugins.toolbar
      ? Prism.plugins.toolbar.registerButton("copy-to-clipboard", function (t) {
          var e = t.element,
            o = (function (t) {
              var e = {
                copy: "Copy",
                "copy-error": "Press Ctrl+C to copy",
                "copy-success": "Copied!",
                "copy-timeout": 5e3,
              };
              for (var o in e) {
                for (
                  var n = "data-prismjs-" + o, c = t;
                  c && !c.hasAttribute(n);

                )
                  c = c.parentElement;
                c && (e[o] = c.getAttribute(n));
              }
              return e;
            })(e),
            n = document.createElement("button");
          (n.className = "copy-to-clipboard-button"),
            n.setAttribute("type", "button");
          var c = document.createElement("span");
          return (
            n.appendChild(c),
            i("copy"),
            u(n, {
              getText: function () {
                return e.textContent;
              },
              success: function () {
                i("copy-success"), r();
              },
              error: function () {
                i("copy-error"),
                  setTimeout(function () {
                    !(function (t) {
                      window.getSelection().selectAllChildren(t);
                    })(e);
                  }, 1),
                  r();
              },
            }),
            n
          );
          function r() {
            setTimeout(function () {
              i("copy");
            }, o["copy-timeout"]);
          }
          function i(t) {
            (c.textContent = o[t]), n.setAttribute("data-copy-state", t);
          }
        })
      : console.warn("Copy to Clipboard plugin loaded before Toolbar plugin."));
})();
"undefined" != typeof Prism &&
  "undefined" != typeof document &&
  document.querySelector &&
  Prism.plugins.toolbar.registerButton("download-file", function (t) {
    var e = t.element.parentNode;
    if (
      e &&
      /pre/i.test(e.nodeName) &&
      e.hasAttribute("data-src") &&
      e.hasAttribute("data-download-link")
    ) {
      var n = e.getAttribute("data-src"),
        a = document.createElement("a");
      return (
        (a.textContent =
          e.getAttribute("data-download-link-label") || "Download"),
        a.setAttribute("download", ""),
        (a.href = n),
        a
      );
    }
  });
