(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode("._dotSvgContainer_17kjy_1{position:absolute;width:100%;height:100%;inset-block-start:0;inset-inline-start:0}._cssPattern_17kjy_9{position:absolute;top:0;right:0;bottom:0;left:0;background-repeat:repeat}._container_1pga7_1{position:relative;overflow:hidden;width:100%;height:100%}._canvasWrapper_1pga7_8{position:relative;width:100%;height:100%;overflow:hidden;background-color:var(--kf-color-bg-gray);cursor:grab;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}._canvasWrapper_1pga7_8._panning_1pga7_21{cursor:grabbing}._canvasWrapper_1pga7_8._selectionMode_1pga7_25,._canvasWrapper_1pga7_8._previewMode_1pga7_29{cursor:default}._canvasWrapper_1pga7_8 .react-infinite-canvas-drag-handle{cursor:grab}._canvasWrapper_1pga7_8 .react-infinite-canvas-dragging{cursor:grabbing;will-change:translate}._canvasWrapper_1pga7_8 .react-infinite-canvas-block-pan,._canvasWrapper_1pga7_8 .react-infinite-canvas-block-events{cursor:auto;-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text}._selectionBox_1pga7_53{position:absolute;inset-block-start:0;inset-inline-start:0;z-index:10;display:none;border:1px solid rgba(66,133,244,.8);background-color:#4285f41f;pointer-events:none}._canvas_1pga7_8{position:relative;z-index:2;width:100%;height:100%}._canvas_1pga7_8>div:first-of-type{position:absolute;inset-inline-start:0;inset-block-start:0;transition:transform .01s ease;will-change:transform;transform:translateZ(0)}._contentWrapper_1pga7_83{position:absolute}._verticalScrollBar_17thb_1{position:absolute;inset-inline-end:2px;inset-block-start:0;inset-block-end:0;background:transparent}._horizontalScrollBar_17thb_9{position:absolute;inset-block-end:2px;inset-inline-start:0;inset-inline-end:0;background:transparent}._verticalScrollBar_17thb_1>div,._horizontalScrollBar_17thb_9>div{position:absolute;border-radius:50px;z-index:8;cursor:pointer}._verticalScrollBar_17thb_1>div{width:100%}._horizontalScrollBar_17thb_9>div{height:100%}")),document.head.appendChild(e)}}catch(t){console.error("vite-plugin-css-injected-by-js",t)}})();
import { jsx as V, jsxs as Ce } from "react/jsx-runtime";
import qn, { forwardRef as Zn, useRef as et, useState as Qn, useImperativeHandle as Jn, useCallback as U, useEffect as Gt, Fragment as $r, memo as kr, useMemo as Wn } from "react";
var Ve = "http://www.w3.org/1999/xhtml";
const Tn = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Ve,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function $e(t) {
  var e = t += "", n = e.indexOf(":");
  return n >= 0 && (e = t.slice(0, n)) !== "xmlns" && (t = t.slice(n + 1)), Tn.hasOwnProperty(e) ? { space: Tn[e], local: t } : t;
}
function Pr(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === Ve && e.documentElement.namespaceURI === Ve ? e.createElement(t) : e.createElementNS(n, t);
  };
}
function Or(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function jn(t) {
  var e = $e(t);
  return (e.local ? Or : Pr)(e);
}
function Fr() {
}
function nn(t) {
  return t == null ? Fr : function() {
    return this.querySelector(t);
  };
}
function Xr(t) {
  typeof t != "function" && (t = nn(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var a = e[i], o = a.length, s = r[i] = new Array(o), l, u, c = 0; c < o; ++c)
      (l = a[c]) && (u = t.call(l, l.__data__, c, a)) && ("__data__" in l && (u.__data__ = l.__data__), s[c] = u);
  return new ht(r, this._parents);
}
function Br(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function Yr() {
  return [];
}
function tr(t) {
  return t == null ? Yr : function() {
    return this.querySelectorAll(t);
  };
}
function Hr(t) {
  return function() {
    return Br(t.apply(this, arguments));
  };
}
function Gr(t) {
  typeof t == "function" ? t = Hr(t) : t = tr(t);
  for (var e = this._groups, n = e.length, r = [], i = [], a = 0; a < n; ++a)
    for (var o = e[a], s = o.length, l, u = 0; u < s; ++u)
      (l = o[u]) && (r.push(t.call(l, l.__data__, u, o)), i.push(l));
  return new ht(r, i);
}
function er(t) {
  return function() {
    return this.matches(t);
  };
}
function nr(t) {
  return function(e) {
    return e.matches(t);
  };
}
var Kr = Array.prototype.find;
function Ur(t) {
  return function() {
    return Kr.call(this.children, t);
  };
}
function Vr() {
  return this.firstElementChild;
}
function qr(t) {
  return this.select(t == null ? Vr : Ur(typeof t == "function" ? t : nr(t)));
}
var Zr = Array.prototype.filter;
function Qr() {
  return Array.from(this.children);
}
function Jr(t) {
  return function() {
    return Zr.call(this.children, t);
  };
}
function Wr(t) {
  return this.selectAll(t == null ? Qr : Jr(typeof t == "function" ? t : nr(t)));
}
function jr(t) {
  typeof t != "function" && (t = er(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var a = e[i], o = a.length, s = r[i] = [], l, u = 0; u < o; ++u)
      (l = a[u]) && t.call(l, l.__data__, u, a) && s.push(l);
  return new ht(r, this._parents);
}
function rr(t) {
  return new Array(t.length);
}
function ti() {
  return new ht(this._enter || this._groups.map(rr), this._parents);
}
function Ne(t, e) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e;
}
Ne.prototype = {
  constructor: Ne,
  appendChild: function(t) {
    return this._parent.insertBefore(t, this._next);
  },
  insertBefore: function(t, e) {
    return this._parent.insertBefore(t, e);
  },
  querySelector: function(t) {
    return this._parent.querySelector(t);
  },
  querySelectorAll: function(t) {
    return this._parent.querySelectorAll(t);
  }
};
function ei(t) {
  return function() {
    return t;
  };
}
function ni(t, e, n, r, i, a) {
  for (var o = 0, s, l = e.length, u = a.length; o < u; ++o)
    (s = e[o]) ? (s.__data__ = a[o], r[o] = s) : n[o] = new Ne(t, a[o]);
  for (; o < l; ++o)
    (s = e[o]) && (i[o] = s);
}
function ri(t, e, n, r, i, a, o) {
  var s, l, u = /* @__PURE__ */ new Map(), c = e.length, _ = a.length, y = new Array(c), S;
  for (s = 0; s < c; ++s)
    (l = e[s]) && (y[s] = S = o.call(l, l.__data__, s, e) + "", u.has(S) ? i[s] = l : u.set(S, l));
  for (s = 0; s < _; ++s)
    S = o.call(t, a[s], s, a) + "", (l = u.get(S)) ? (r[s] = l, l.__data__ = a[s], u.delete(S)) : n[s] = new Ne(t, a[s]);
  for (s = 0; s < c; ++s)
    (l = e[s]) && u.get(y[s]) === l && (i[s] = l);
}
function ii(t) {
  return t.__data__;
}
function oi(t, e) {
  if (!arguments.length) return Array.from(this, ii);
  var n = e ? ri : ni, r = this._parents, i = this._groups;
  typeof t != "function" && (t = ei(t));
  for (var a = i.length, o = new Array(a), s = new Array(a), l = new Array(a), u = 0; u < a; ++u) {
    var c = r[u], _ = i[u], y = _.length, S = ai(t.call(c, c && c.__data__, u, r)), D = S.length, E = s[u] = new Array(D), $ = o[u] = new Array(D), x = l[u] = new Array(y);
    n(c, _, E, $, x, S, e);
    for (var X = 0, K = 0, F, J; X < D; ++X)
      if (F = E[X]) {
        for (X >= K && (K = X + 1); !(J = $[K]) && ++K < D; ) ;
        F._next = J || null;
      }
  }
  return o = new ht(o, r), o._enter = s, o._exit = l, o;
}
function ai(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function si() {
  return new ht(this._exit || this._groups.map(rr), this._parents);
}
function ci(t, e, n) {
  var r = this.enter(), i = this, a = this.exit();
  return typeof t == "function" ? (r = t(r), r && (r = r.selection())) : r = r.append(t + ""), e != null && (i = e(i), i && (i = i.selection())), n == null ? a.remove() : n(a), r && i ? r.merge(i).order() : i;
}
function li(t) {
  for (var e = t.selection ? t.selection() : t, n = this._groups, r = e._groups, i = n.length, a = r.length, o = Math.min(i, a), s = new Array(i), l = 0; l < o; ++l)
    for (var u = n[l], c = r[l], _ = u.length, y = s[l] = new Array(_), S, D = 0; D < _; ++D)
      (S = u[D] || c[D]) && (y[D] = S);
  for (; l < i; ++l)
    s[l] = n[l];
  return new ht(s, this._parents);
}
function ui() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var r = t[e], i = r.length - 1, a = r[i], o; --i >= 0; )
      (o = r[i]) && (a && o.compareDocumentPosition(a) ^ 4 && a.parentNode.insertBefore(o, a), a = o);
  return this;
}
function fi(t) {
  t || (t = hi);
  function e(_, y) {
    return _ && y ? t(_.__data__, y.__data__) : !_ - !y;
  }
  for (var n = this._groups, r = n.length, i = new Array(r), a = 0; a < r; ++a) {
    for (var o = n[a], s = o.length, l = i[a] = new Array(s), u, c = 0; c < s; ++c)
      (u = o[c]) && (l[c] = u);
    l.sort(e);
  }
  return new ht(i, this._parents).order();
}
function hi(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function di() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function pi() {
  return Array.from(this);
}
function gi() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, a = r.length; i < a; ++i) {
      var o = r[i];
      if (o) return o;
    }
  return null;
}
function mi() {
  let t = 0;
  for (const e of this) ++t;
  return t;
}
function _i() {
  return !this.node();
}
function yi(t) {
  for (var e = this._groups, n = 0, r = e.length; n < r; ++n)
    for (var i = e[n], a = 0, o = i.length, s; a < o; ++a)
      (s = i[a]) && t.call(s, s.__data__, a, i);
  return this;
}
function wi(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function xi(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function vi(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function Ei(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function Si(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttribute(t) : this.setAttribute(t, n);
  };
}
function bi(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n);
  };
}
function Ti(t, e) {
  var n = $e(t);
  if (arguments.length < 2) {
    var r = this.node();
    return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
  }
  return this.each((e == null ? n.local ? xi : wi : typeof e == "function" ? n.local ? bi : Si : n.local ? Ei : vi)(n, e));
}
function ir(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function Ci(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Ni(t, e, n) {
  return function() {
    this.style.setProperty(t, e, n);
  };
}
function Li(t, e, n) {
  return function() {
    var r = e.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, n);
  };
}
function Mi(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? Ci : typeof e == "function" ? Li : Ni)(t, e, n == null ? "" : n)) : Ut(this.node(), t);
}
function Ut(t, e) {
  return t.style.getPropertyValue(e) || ir(t).getComputedStyle(t, null).getPropertyValue(e);
}
function Ai(t) {
  return function() {
    delete this[t];
  };
}
function Ri(t, e) {
  return function() {
    this[t] = e;
  };
}
function Ii(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? delete this[t] : this[t] = n;
  };
}
function Di(t, e) {
  return arguments.length > 1 ? this.each((e == null ? Ai : typeof e == "function" ? Ii : Ri)(t, e)) : this.node()[t];
}
function or(t) {
  return t.trim().split(/^|\s+/);
}
function rn(t) {
  return t.classList || new ar(t);
}
function ar(t) {
  this._node = t, this._names = or(t.getAttribute("class") || "");
}
ar.prototype = {
  add: function(t) {
    var e = this._names.indexOf(t);
    e < 0 && (this._names.push(t), this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function(t) {
    var e = this._names.indexOf(t);
    e >= 0 && (this._names.splice(e, 1), this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function(t) {
    return this._names.indexOf(t) >= 0;
  }
};
function sr(t, e) {
  for (var n = rn(t), r = -1, i = e.length; ++r < i; ) n.add(e[r]);
}
function cr(t, e) {
  for (var n = rn(t), r = -1, i = e.length; ++r < i; ) n.remove(e[r]);
}
function zi(t) {
  return function() {
    sr(this, t);
  };
}
function $i(t) {
  return function() {
    cr(this, t);
  };
}
function ki(t, e) {
  return function() {
    (e.apply(this, arguments) ? sr : cr)(this, t);
  };
}
function Pi(t, e) {
  var n = or(t + "");
  if (arguments.length < 2) {
    for (var r = rn(this.node()), i = -1, a = n.length; ++i < a; ) if (!r.contains(n[i])) return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? ki : e ? zi : $i)(n, e));
}
function Oi() {
  this.textContent = "";
}
function Fi(t) {
  return function() {
    this.textContent = t;
  };
}
function Xi(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e == null ? "" : e;
  };
}
function Bi(t) {
  return arguments.length ? this.each(t == null ? Oi : (typeof t == "function" ? Xi : Fi)(t)) : this.node().textContent;
}
function Yi() {
  this.innerHTML = "";
}
function Hi(t) {
  return function() {
    this.innerHTML = t;
  };
}
function Gi(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e == null ? "" : e;
  };
}
function Ki(t) {
  return arguments.length ? this.each(t == null ? Yi : (typeof t == "function" ? Gi : Hi)(t)) : this.node().innerHTML;
}
function Ui() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Vi() {
  return this.each(Ui);
}
function qi() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Zi() {
  return this.each(qi);
}
function Qi(t) {
  var e = typeof t == "function" ? t : jn(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function Ji() {
  return null;
}
function Wi(t, e) {
  var n = typeof t == "function" ? t : jn(t), r = e == null ? Ji : typeof e == "function" ? e : nn(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function ji() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function to() {
  return this.each(ji);
}
function eo() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function no() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function ro(t) {
  return this.select(t ? no : eo);
}
function io(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function oo(t) {
  return function(e) {
    t.call(this, e, this.__data__);
  };
}
function ao(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var n = "", r = e.indexOf(".");
    return r >= 0 && (n = e.slice(r + 1), e = e.slice(0, r)), { type: e, name: n };
  });
}
function so(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var n = 0, r = -1, i = e.length, a; n < i; ++n)
        a = e[n], (!t.type || a.type === t.type) && a.name === t.name ? this.removeEventListener(a.type, a.listener, a.options) : e[++r] = a;
      ++r ? e.length = r : delete this.__on;
    }
  };
}
function co(t, e, n) {
  return function() {
    var r = this.__on, i, a = oo(e);
    if (r) {
      for (var o = 0, s = r.length; o < s; ++o)
        if ((i = r[o]).type === t.type && i.name === t.name) {
          this.removeEventListener(i.type, i.listener, i.options), this.addEventListener(i.type, i.listener = a, i.options = n), i.value = e;
          return;
        }
    }
    this.addEventListener(t.type, a, n), i = { type: t.type, name: t.name, value: e, listener: a, options: n }, r ? r.push(i) : this.__on = [i];
  };
}
function lo(t, e, n) {
  var r = ao(t + ""), i, a = r.length, o;
  if (arguments.length < 2) {
    var s = this.node().__on;
    if (s) {
      for (var l = 0, u = s.length, c; l < u; ++l)
        for (i = 0, c = s[l]; i < a; ++i)
          if ((o = r[i]).type === c.type && o.name === c.name)
            return c.value;
    }
    return;
  }
  for (s = e ? co : so, i = 0; i < a; ++i) this.each(s(r[i], e, n));
  return this;
}
function lr(t, e, n) {
  var r = ir(t), i = r.CustomEvent;
  typeof i == "function" ? i = new i(e, n) : (i = r.document.createEvent("Event"), n ? (i.initEvent(e, n.bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(e, !1, !1)), t.dispatchEvent(i);
}
function uo(t, e) {
  return function() {
    return lr(this, t, e);
  };
}
function fo(t, e) {
  return function() {
    return lr(this, t, e.apply(this, arguments));
  };
}
function ho(t, e) {
  return this.each((typeof e == "function" ? fo : uo)(t, e));
}
function* po() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, a = r.length, o; i < a; ++i)
      (o = r[i]) && (yield o);
}
var ur = [null];
function ht(t, e) {
  this._groups = t, this._parents = e;
}
function ce() {
  return new ht([[document.documentElement]], ur);
}
function go() {
  return this;
}
ht.prototype = ce.prototype = {
  constructor: ht,
  select: Xr,
  selectAll: Gr,
  selectChild: qr,
  selectChildren: Wr,
  filter: jr,
  data: oi,
  enter: ti,
  exit: si,
  join: ci,
  merge: li,
  selection: go,
  order: ui,
  sort: fi,
  call: di,
  nodes: pi,
  node: gi,
  size: mi,
  empty: _i,
  each: yi,
  attr: Ti,
  style: Mi,
  property: Di,
  classed: Pi,
  text: Bi,
  html: Ki,
  raise: Vi,
  lower: Zi,
  append: Qi,
  insert: Wi,
  remove: to,
  clone: ro,
  datum: io,
  on: lo,
  dispatch: ho,
  [Symbol.iterator]: po
};
function at(t) {
  return typeof t == "string" ? new ht([[document.querySelector(t)]], [document.documentElement]) : new ht([[t]], ur);
}
function mo(t) {
  let e;
  for (; e = t.sourceEvent; ) t = e;
  return t;
}
function $t(t, e) {
  if (t = mo(t), e === void 0 && (e = t.currentTarget), e) {
    var n = e.ownerSVGElement || e;
    if (n.createSVGPoint) {
      var r = n.createSVGPoint();
      return r.x = t.clientX, r.y = t.clientY, r = r.matrixTransform(e.getScreenCTM().inverse()), [r.x, r.y];
    }
    if (e.getBoundingClientRect) {
      var i = e.getBoundingClientRect();
      return [t.clientX - i.left - e.clientLeft, t.clientY - i.top - e.clientTop];
    }
  }
  return [t.pageX, t.pageY];
}
var _o = { value: () => {
} };
function on() {
  for (var t = 0, e = arguments.length, n = {}, r; t < e; ++t) {
    if (!(r = arguments[t] + "") || r in n || /[\s.]/.test(r)) throw new Error("illegal type: " + r);
    n[r] = [];
  }
  return new Ee(n);
}
function Ee(t) {
  this._ = t;
}
function yo(t, e) {
  return t.trim().split(/^|\s+/).map(function(n) {
    var r = "", i = n.indexOf(".");
    if (i >= 0 && (r = n.slice(i + 1), n = n.slice(0, i)), n && !e.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: r };
  });
}
Ee.prototype = on.prototype = {
  constructor: Ee,
  on: function(t, e) {
    var n = this._, r = yo(t + "", n), i, a = -1, o = r.length;
    if (arguments.length < 2) {
      for (; ++a < o; ) if ((i = (t = r[a]).type) && (i = wo(n[i], t.name))) return i;
      return;
    }
    if (e != null && typeof e != "function") throw new Error("invalid callback: " + e);
    for (; ++a < o; )
      if (i = (t = r[a]).type) n[i] = Cn(n[i], t.name, e);
      else if (e == null) for (i in n) n[i] = Cn(n[i], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, e = this._;
    for (var n in e) t[n] = e[n].slice();
    return new Ee(t);
  },
  call: function(t, e) {
    if ((i = arguments.length - 2) > 0) for (var n = new Array(i), r = 0, i, a; r < i; ++r) n[r] = arguments[r + 2];
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (a = this._[t], r = 0, i = a.length; r < i; ++r) a[r].value.apply(e, n);
  },
  apply: function(t, e, n) {
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (var r = this._[t], i = 0, a = r.length; i < a; ++i) r[i].value.apply(e, n);
  }
};
function wo(t, e) {
  for (var n = 0, r = t.length, i; n < r; ++n)
    if ((i = t[n]).name === e)
      return i.value;
}
function Cn(t, e, n) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === e) {
      t[r] = _o, t = t.slice(0, r).concat(t.slice(r + 1));
      break;
    }
  return n != null && t.push({ name: e, value: n }), t;
}
const qe = { capture: !0, passive: !1 };
function Ze(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function xo(t) {
  var e = t.document.documentElement, n = at(t).on("dragstart.drag", Ze, qe);
  "onselectstart" in e ? n.on("selectstart.drag", Ze, qe) : (e.__noselect = e.style.MozUserSelect, e.style.MozUserSelect = "none");
}
function vo(t, e) {
  var n = t.document.documentElement, r = at(t).on("dragstart.drag", null);
  e && (r.on("click.drag", Ze, qe), setTimeout(function() {
    r.on("click.drag", null);
  }, 0)), "onselectstart" in n ? r.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
function an(t, e, n) {
  t.prototype = e.prototype = n, n.constructor = t;
}
function fr(t, e) {
  var n = Object.create(t.prototype);
  for (var r in e) n[r] = e[r];
  return n;
}
function le() {
}
var ie = 0.7, Le = 1 / ie, Kt = "\\s*([+-]?\\d+)\\s*", oe = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Tt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Eo = /^#([0-9a-f]{3,8})$/, So = new RegExp(`^rgb\\(${Kt},${Kt},${Kt}\\)$`), bo = new RegExp(`^rgb\\(${Tt},${Tt},${Tt}\\)$`), To = new RegExp(`^rgba\\(${Kt},${Kt},${Kt},${oe}\\)$`), Co = new RegExp(`^rgba\\(${Tt},${Tt},${Tt},${oe}\\)$`), No = new RegExp(`^hsl\\(${oe},${Tt},${Tt}\\)$`), Lo = new RegExp(`^hsla\\(${oe},${Tt},${Tt},${oe}\\)$`), Nn = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
an(le, ae, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Ln,
  // Deprecated! Use color.formatHex.
  formatHex: Ln,
  formatHex8: Mo,
  formatHsl: Ao,
  formatRgb: Mn,
  toString: Mn
});
function Ln() {
  return this.rgb().formatHex();
}
function Mo() {
  return this.rgb().formatHex8();
}
function Ao() {
  return hr(this).formatHsl();
}
function Mn() {
  return this.rgb().formatRgb();
}
function ae(t) {
  var e, n;
  return t = (t + "").trim().toLowerCase(), (e = Eo.exec(t)) ? (n = e[1].length, e = parseInt(e[1], 16), n === 6 ? An(e) : n === 3 ? new lt(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : n === 8 ? _e(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : n === 4 ? _e(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = So.exec(t)) ? new lt(e[1], e[2], e[3], 1) : (e = bo.exec(t)) ? new lt(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = To.exec(t)) ? _e(e[1], e[2], e[3], e[4]) : (e = Co.exec(t)) ? _e(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = No.exec(t)) ? Dn(e[1], e[2] / 100, e[3] / 100, 1) : (e = Lo.exec(t)) ? Dn(e[1], e[2] / 100, e[3] / 100, e[4]) : Nn.hasOwnProperty(t) ? An(Nn[t]) : t === "transparent" ? new lt(NaN, NaN, NaN, 0) : null;
}
function An(t) {
  return new lt(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function _e(t, e, n, r) {
  return r <= 0 && (t = e = n = NaN), new lt(t, e, n, r);
}
function Ro(t) {
  return t instanceof le || (t = ae(t)), t ? (t = t.rgb(), new lt(t.r, t.g, t.b, t.opacity)) : new lt();
}
function Qe(t, e, n, r) {
  return arguments.length === 1 ? Ro(t) : new lt(t, e, n, r == null ? 1 : r);
}
function lt(t, e, n, r) {
  this.r = +t, this.g = +e, this.b = +n, this.opacity = +r;
}
an(lt, Qe, fr(le, {
  brighter(t) {
    return t = t == null ? Le : Math.pow(Le, t), new lt(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? ie : Math.pow(ie, t), new lt(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new lt(Ft(this.r), Ft(this.g), Ft(this.b), Me(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Rn,
  // Deprecated! Use color.formatHex.
  formatHex: Rn,
  formatHex8: Io,
  formatRgb: In,
  toString: In
}));
function Rn() {
  return `#${Ot(this.r)}${Ot(this.g)}${Ot(this.b)}`;
}
function Io() {
  return `#${Ot(this.r)}${Ot(this.g)}${Ot(this.b)}${Ot((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function In() {
  const t = Me(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${Ft(this.r)}, ${Ft(this.g)}, ${Ft(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function Me(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function Ft(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function Ot(t) {
  return t = Ft(t), (t < 16 ? "0" : "") + t.toString(16);
}
function Dn(t, e, n, r) {
  return r <= 0 ? t = e = n = NaN : n <= 0 || n >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new xt(t, e, n, r);
}
function hr(t) {
  if (t instanceof xt) return new xt(t.h, t.s, t.l, t.opacity);
  if (t instanceof le || (t = ae(t)), !t) return new xt();
  if (t instanceof xt) return t;
  t = t.rgb();
  var e = t.r / 255, n = t.g / 255, r = t.b / 255, i = Math.min(e, n, r), a = Math.max(e, n, r), o = NaN, s = a - i, l = (a + i) / 2;
  return s ? (e === a ? o = (n - r) / s + (n < r) * 6 : n === a ? o = (r - e) / s + 2 : o = (e - n) / s + 4, s /= l < 0.5 ? a + i : 2 - a - i, o *= 60) : s = l > 0 && l < 1 ? 0 : o, new xt(o, s, l, t.opacity);
}
function Do(t, e, n, r) {
  return arguments.length === 1 ? hr(t) : new xt(t, e, n, r == null ? 1 : r);
}
function xt(t, e, n, r) {
  this.h = +t, this.s = +e, this.l = +n, this.opacity = +r;
}
an(xt, Do, fr(le, {
  brighter(t) {
    return t = t == null ? Le : Math.pow(Le, t), new xt(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? ie : Math.pow(ie, t), new xt(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, e = isNaN(t) || isNaN(this.s) ? 0 : this.s, n = this.l, r = n + (n < 0.5 ? n : 1 - n) * e, i = 2 * n - r;
    return new lt(
      Be(t >= 240 ? t - 240 : t + 120, i, r),
      Be(t, i, r),
      Be(t < 120 ? t + 240 : t - 120, i, r),
      this.opacity
    );
  },
  clamp() {
    return new xt(zn(this.h), ye(this.s), ye(this.l), Me(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = Me(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${zn(this.h)}, ${ye(this.s) * 100}%, ${ye(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function zn(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function ye(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function Be(t, e, n) {
  return (t < 60 ? e + (n - e) * t / 60 : t < 180 ? n : t < 240 ? e + (n - e) * (240 - t) / 60 : e) * 255;
}
const dr = (t) => () => t;
function zo(t, e) {
  return function(n) {
    return t + n * e;
  };
}
function $o(t, e, n) {
  return t = Math.pow(t, n), e = Math.pow(e, n) - t, n = 1 / n, function(r) {
    return Math.pow(t + r * e, n);
  };
}
function ko(t) {
  return (t = +t) == 1 ? pr : function(e, n) {
    return n - e ? $o(e, n, t) : dr(isNaN(e) ? n : e);
  };
}
function pr(t, e) {
  var n = e - t;
  return n ? zo(t, n) : dr(isNaN(t) ? e : t);
}
const $n = function t(e) {
  var n = ko(e);
  function r(i, a) {
    var o = n((i = Qe(i)).r, (a = Qe(a)).r), s = n(i.g, a.g), l = n(i.b, a.b), u = pr(i.opacity, a.opacity);
    return function(c) {
      return i.r = o(c), i.g = s(c), i.b = l(c), i.opacity = u(c), i + "";
    };
  }
  return r.gamma = t, r;
}(1);
function kt(t, e) {
  return t = +t, e = +e, function(n) {
    return t * (1 - n) + e * n;
  };
}
var Je = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Ye = new RegExp(Je.source, "g");
function Po(t) {
  return function() {
    return t;
  };
}
function Oo(t) {
  return function(e) {
    return t(e) + "";
  };
}
function Fo(t, e) {
  var n = Je.lastIndex = Ye.lastIndex = 0, r, i, a, o = -1, s = [], l = [];
  for (t = t + "", e = e + ""; (r = Je.exec(t)) && (i = Ye.exec(e)); )
    (a = i.index) > n && (a = e.slice(n, a), s[o] ? s[o] += a : s[++o] = a), (r = r[0]) === (i = i[0]) ? s[o] ? s[o] += i : s[++o] = i : (s[++o] = null, l.push({ i: o, x: kt(r, i) })), n = Ye.lastIndex;
  return n < e.length && (a = e.slice(n), s[o] ? s[o] += a : s[++o] = a), s.length < 2 ? l[0] ? Oo(l[0].x) : Po(e) : (e = l.length, function(u) {
    for (var c = 0, _; c < e; ++c) s[(_ = l[c]).i] = _.x(u);
    return s.join("");
  });
}
var kn = 180 / Math.PI, We = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function gr(t, e, n, r, i, a) {
  var o, s, l;
  return (o = Math.sqrt(t * t + e * e)) && (t /= o, e /= o), (l = t * n + e * r) && (n -= t * l, r -= e * l), (s = Math.sqrt(n * n + r * r)) && (n /= s, r /= s, l /= s), t * r < e * n && (t = -t, e = -e, l = -l, o = -o), {
    translateX: i,
    translateY: a,
    rotate: Math.atan2(e, t) * kn,
    skewX: Math.atan(l) * kn,
    scaleX: o,
    scaleY: s
  };
}
var we;
function Xo(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? We : gr(e.a, e.b, e.c, e.d, e.e, e.f);
}
function Bo(t) {
  return t == null || (we || (we = document.createElementNS("http://www.w3.org/2000/svg", "g")), we.setAttribute("transform", t), !(t = we.transform.baseVal.consolidate())) ? We : (t = t.matrix, gr(t.a, t.b, t.c, t.d, t.e, t.f));
}
function mr(t, e, n, r) {
  function i(u) {
    return u.length ? u.pop() + " " : "";
  }
  function a(u, c, _, y, S, D) {
    if (u !== _ || c !== y) {
      var E = S.push("translate(", null, e, null, n);
      D.push({ i: E - 4, x: kt(u, _) }, { i: E - 2, x: kt(c, y) });
    } else (_ || y) && S.push("translate(" + _ + e + y + n);
  }
  function o(u, c, _, y) {
    u !== c ? (u - c > 180 ? c += 360 : c - u > 180 && (u += 360), y.push({ i: _.push(i(_) + "rotate(", null, r) - 2, x: kt(u, c) })) : c && _.push(i(_) + "rotate(" + c + r);
  }
  function s(u, c, _, y) {
    u !== c ? y.push({ i: _.push(i(_) + "skewX(", null, r) - 2, x: kt(u, c) }) : c && _.push(i(_) + "skewX(" + c + r);
  }
  function l(u, c, _, y, S, D) {
    if (u !== _ || c !== y) {
      var E = S.push(i(S) + "scale(", null, ",", null, ")");
      D.push({ i: E - 4, x: kt(u, _) }, { i: E - 2, x: kt(c, y) });
    } else (_ !== 1 || y !== 1) && S.push(i(S) + "scale(" + _ + "," + y + ")");
  }
  return function(u, c) {
    var _ = [], y = [];
    return u = t(u), c = t(c), a(u.translateX, u.translateY, c.translateX, c.translateY, _, y), o(u.rotate, c.rotate, _, y), s(u.skewX, c.skewX, _, y), l(u.scaleX, u.scaleY, c.scaleX, c.scaleY, _, y), u = c = null, function(S) {
      for (var D = -1, E = y.length, $; ++D < E; ) _[($ = y[D]).i] = $.x(S);
      return _.join("");
    };
  };
}
var Yo = mr(Xo, "px, ", "px)", "deg)"), Ho = mr(Bo, ", ", ")", ")"), Go = 1e-12;
function Pn(t) {
  return ((t = Math.exp(t)) + 1 / t) / 2;
}
function Ko(t) {
  return ((t = Math.exp(t)) - 1 / t) / 2;
}
function Uo(t) {
  return ((t = Math.exp(2 * t)) - 1) / (t + 1);
}
const Vo = function t(e, n, r) {
  function i(a, o) {
    var s = a[0], l = a[1], u = a[2], c = o[0], _ = o[1], y = o[2], S = c - s, D = _ - l, E = S * S + D * D, $, x;
    if (E < Go)
      x = Math.log(y / u) / e, $ = function(P) {
        return [
          s + P * S,
          l + P * D,
          u * Math.exp(e * P * x)
        ];
      };
    else {
      var X = Math.sqrt(E), K = (y * y - u * u + r * E) / (2 * u * n * X), F = (y * y - u * u - r * E) / (2 * y * n * X), J = Math.log(Math.sqrt(K * K + 1) - K), q = Math.log(Math.sqrt(F * F + 1) - F);
      x = (q - J) / e, $ = function(P) {
        var O = P * x, B = Pn(J), st = u / (n * X) * (B * Uo(e * O + J) - Ko(J));
        return [
          s + st * S,
          l + st * D,
          u * B / Pn(e * O + J)
        ];
      };
    }
    return $.duration = x * 1e3 * e / Math.SQRT2, $;
  }
  return i.rho = function(a) {
    var o = Math.max(1e-3, +a), s = o * o, l = s * s;
    return t(o, s, l);
  }, i;
}(Math.SQRT2, 2, 4);
var Vt = 0, ee = 0, jt = 0, _r = 1e3, Ae, ne, Re = 0, Bt = 0, ke = 0, se = typeof performance == "object" && performance.now ? performance : Date, yr = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function sn() {
  return Bt || (yr(qo), Bt = se.now() + ke);
}
function qo() {
  Bt = 0;
}
function Ie() {
  this._call = this._time = this._next = null;
}
Ie.prototype = wr.prototype = {
  constructor: Ie,
  restart: function(t, e, n) {
    if (typeof t != "function") throw new TypeError("callback is not a function");
    n = (n == null ? sn() : +n) + (e == null ? 0 : +e), !this._next && ne !== this && (ne ? ne._next = this : Ae = this, ne = this), this._call = t, this._time = n, je();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, je());
  }
};
function wr(t, e, n) {
  var r = new Ie();
  return r.restart(t, e, n), r;
}
function Zo() {
  sn(), ++Vt;
  for (var t = Ae, e; t; )
    (e = Bt - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --Vt;
}
function On() {
  Bt = (Re = se.now()) + ke, Vt = ee = 0;
  try {
    Zo();
  } finally {
    Vt = 0, Jo(), Bt = 0;
  }
}
function Qo() {
  var t = se.now(), e = t - Re;
  e > _r && (ke -= e, Re = t);
}
function Jo() {
  for (var t, e = Ae, n, r = 1 / 0; e; )
    e._call ? (r > e._time && (r = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : Ae = n);
  ne = t, je(r);
}
function je(t) {
  if (!Vt) {
    ee && (ee = clearTimeout(ee));
    var e = t - Bt;
    e > 24 ? (t < 1 / 0 && (ee = setTimeout(On, t - se.now() - ke)), jt && (jt = clearInterval(jt))) : (jt || (Re = se.now(), jt = setInterval(Qo, _r)), Vt = 1, yr(On));
  }
}
function Fn(t, e, n) {
  var r = new Ie();
  return e = e == null ? 0 : +e, r.restart((i) => {
    r.stop(), t(i + e);
  }, e, n), r;
}
var Wo = on("start", "end", "cancel", "interrupt"), jo = [], xr = 0, Xn = 1, tn = 2, Se = 3, Bn = 4, en = 5, be = 6;
function Pe(t, e, n, r, i, a) {
  var o = t.__transition;
  if (!o) t.__transition = {};
  else if (n in o) return;
  ta(t, n, {
    name: e,
    index: r,
    // For context during callback.
    group: i,
    // For context during callback.
    on: Wo,
    tween: jo,
    time: a.time,
    delay: a.delay,
    duration: a.duration,
    ease: a.ease,
    timer: null,
    state: xr
  });
}
function cn(t, e) {
  var n = vt(t, e);
  if (n.state > xr) throw new Error("too late; already scheduled");
  return n;
}
function Ct(t, e) {
  var n = vt(t, e);
  if (n.state > Se) throw new Error("too late; already running");
  return n;
}
function vt(t, e) {
  var n = t.__transition;
  if (!n || !(n = n[e])) throw new Error("transition not found");
  return n;
}
function ta(t, e, n) {
  var r = t.__transition, i;
  r[e] = n, n.timer = wr(a, 0, n.time);
  function a(u) {
    n.state = Xn, n.timer.restart(o, n.delay, n.time), n.delay <= u && o(u - n.delay);
  }
  function o(u) {
    var c, _, y, S;
    if (n.state !== Xn) return l();
    for (c in r)
      if (S = r[c], S.name === n.name) {
        if (S.state === Se) return Fn(o);
        S.state === Bn ? (S.state = be, S.timer.stop(), S.on.call("interrupt", t, t.__data__, S.index, S.group), delete r[c]) : +c < e && (S.state = be, S.timer.stop(), S.on.call("cancel", t, t.__data__, S.index, S.group), delete r[c]);
      }
    if (Fn(function() {
      n.state === Se && (n.state = Bn, n.timer.restart(s, n.delay, n.time), s(u));
    }), n.state = tn, n.on.call("start", t, t.__data__, n.index, n.group), n.state === tn) {
      for (n.state = Se, i = new Array(y = n.tween.length), c = 0, _ = -1; c < y; ++c)
        (S = n.tween[c].value.call(t, t.__data__, n.index, n.group)) && (i[++_] = S);
      i.length = _ + 1;
    }
  }
  function s(u) {
    for (var c = u < n.duration ? n.ease.call(null, u / n.duration) : (n.timer.restart(l), n.state = en, 1), _ = -1, y = i.length; ++_ < y; )
      i[_].call(t, c);
    n.state === en && (n.on.call("end", t, t.__data__, n.index, n.group), l());
  }
  function l() {
    n.state = be, n.timer.stop(), delete r[e];
    for (var u in r) return;
    delete t.__transition;
  }
}
function Te(t, e) {
  var n = t.__transition, r, i, a = !0, o;
  if (n) {
    e = e == null ? null : e + "";
    for (o in n) {
      if ((r = n[o]).name !== e) {
        a = !1;
        continue;
      }
      i = r.state > tn && r.state < en, r.state = be, r.timer.stop(), r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group), delete n[o];
    }
    a && delete t.__transition;
  }
}
function ea(t) {
  return this.each(function() {
    Te(this, t);
  });
}
function na(t, e) {
  var n, r;
  return function() {
    var i = Ct(this, t), a = i.tween;
    if (a !== n) {
      r = n = a;
      for (var o = 0, s = r.length; o < s; ++o)
        if (r[o].name === e) {
          r = r.slice(), r.splice(o, 1);
          break;
        }
    }
    i.tween = r;
  };
}
function ra(t, e, n) {
  var r, i;
  if (typeof n != "function") throw new Error();
  return function() {
    var a = Ct(this, t), o = a.tween;
    if (o !== r) {
      i = (r = o).slice();
      for (var s = { name: e, value: n }, l = 0, u = i.length; l < u; ++l)
        if (i[l].name === e) {
          i[l] = s;
          break;
        }
      l === u && i.push(s);
    }
    a.tween = i;
  };
}
function ia(t, e) {
  var n = this._id;
  if (t += "", arguments.length < 2) {
    for (var r = vt(this.node(), n).tween, i = 0, a = r.length, o; i < a; ++i)
      if ((o = r[i]).name === t)
        return o.value;
    return null;
  }
  return this.each((e == null ? na : ra)(n, t, e));
}
function ln(t, e, n) {
  var r = t._id;
  return t.each(function() {
    var i = Ct(this, r);
    (i.value || (i.value = {}))[e] = n.apply(this, arguments);
  }), function(i) {
    return vt(i, r).value[e];
  };
}
function vr(t, e) {
  var n;
  return (typeof e == "number" ? kt : e instanceof ae ? $n : (n = ae(e)) ? (e = n, $n) : Fo)(t, e);
}
function oa(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function aa(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function sa(t, e, n) {
  var r, i = n + "", a;
  return function() {
    var o = this.getAttribute(t);
    return o === i ? null : o === r ? a : a = e(r = o, n);
  };
}
function ca(t, e, n) {
  var r, i = n + "", a;
  return function() {
    var o = this.getAttributeNS(t.space, t.local);
    return o === i ? null : o === r ? a : a = e(r = o, n);
  };
}
function la(t, e, n) {
  var r, i, a;
  return function() {
    var o, s = n(this), l;
    return s == null ? void this.removeAttribute(t) : (o = this.getAttribute(t), l = s + "", o === l ? null : o === r && l === i ? a : (i = l, a = e(r = o, s)));
  };
}
function ua(t, e, n) {
  var r, i, a;
  return function() {
    var o, s = n(this), l;
    return s == null ? void this.removeAttributeNS(t.space, t.local) : (o = this.getAttributeNS(t.space, t.local), l = s + "", o === l ? null : o === r && l === i ? a : (i = l, a = e(r = o, s)));
  };
}
function fa(t, e) {
  var n = $e(t), r = n === "transform" ? Ho : vr;
  return this.attrTween(t, typeof e == "function" ? (n.local ? ua : la)(n, r, ln(this, "attr." + t, e)) : e == null ? (n.local ? aa : oa)(n) : (n.local ? ca : sa)(n, r, e));
}
function ha(t, e) {
  return function(n) {
    this.setAttribute(t, e.call(this, n));
  };
}
function da(t, e) {
  return function(n) {
    this.setAttributeNS(t.space, t.local, e.call(this, n));
  };
}
function pa(t, e) {
  var n, r;
  function i() {
    var a = e.apply(this, arguments);
    return a !== r && (n = (r = a) && da(t, a)), n;
  }
  return i._value = e, i;
}
function ga(t, e) {
  var n, r;
  function i() {
    var a = e.apply(this, arguments);
    return a !== r && (n = (r = a) && ha(t, a)), n;
  }
  return i._value = e, i;
}
function ma(t, e) {
  var n = "attr." + t;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (e == null) return this.tween(n, null);
  if (typeof e != "function") throw new Error();
  var r = $e(t);
  return this.tween(n, (r.local ? pa : ga)(r, e));
}
function _a(t, e) {
  return function() {
    cn(this, t).delay = +e.apply(this, arguments);
  };
}
function ya(t, e) {
  return e = +e, function() {
    cn(this, t).delay = e;
  };
}
function wa(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? _a : ya)(e, t)) : vt(this.node(), e).delay;
}
function xa(t, e) {
  return function() {
    Ct(this, t).duration = +e.apply(this, arguments);
  };
}
function va(t, e) {
  return e = +e, function() {
    Ct(this, t).duration = e;
  };
}
function Ea(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? xa : va)(e, t)) : vt(this.node(), e).duration;
}
function Sa(t, e) {
  if (typeof e != "function") throw new Error();
  return function() {
    Ct(this, t).ease = e;
  };
}
function ba(t) {
  var e = this._id;
  return arguments.length ? this.each(Sa(e, t)) : vt(this.node(), e).ease;
}
function Ta(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    Ct(this, t).ease = n;
  };
}
function Ca(t) {
  if (typeof t != "function") throw new Error();
  return this.each(Ta(this._id, t));
}
function Na(t) {
  typeof t != "function" && (t = er(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var a = e[i], o = a.length, s = r[i] = [], l, u = 0; u < o; ++u)
      (l = a[u]) && t.call(l, l.__data__, u, a) && s.push(l);
  return new Rt(r, this._parents, this._name, this._id);
}
function La(t) {
  if (t._id !== this._id) throw new Error();
  for (var e = this._groups, n = t._groups, r = e.length, i = n.length, a = Math.min(r, i), o = new Array(r), s = 0; s < a; ++s)
    for (var l = e[s], u = n[s], c = l.length, _ = o[s] = new Array(c), y, S = 0; S < c; ++S)
      (y = l[S] || u[S]) && (_[S] = y);
  for (; s < r; ++s)
    o[s] = e[s];
  return new Rt(o, this._parents, this._name, this._id);
}
function Ma(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var n = e.indexOf(".");
    return n >= 0 && (e = e.slice(0, n)), !e || e === "start";
  });
}
function Aa(t, e, n) {
  var r, i, a = Ma(e) ? cn : Ct;
  return function() {
    var o = a(this, t), s = o.on;
    s !== r && (i = (r = s).copy()).on(e, n), o.on = i;
  };
}
function Ra(t, e) {
  var n = this._id;
  return arguments.length < 2 ? vt(this.node(), n).on.on(t) : this.each(Aa(n, t, e));
}
function Ia(t) {
  return function() {
    var e = this.parentNode;
    for (var n in this.__transition) if (+n !== t) return;
    e && e.removeChild(this);
  };
}
function Da() {
  return this.on("end.remove", Ia(this._id));
}
function za(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = nn(t));
  for (var r = this._groups, i = r.length, a = new Array(i), o = 0; o < i; ++o)
    for (var s = r[o], l = s.length, u = a[o] = new Array(l), c, _, y = 0; y < l; ++y)
      (c = s[y]) && (_ = t.call(c, c.__data__, y, s)) && ("__data__" in c && (_.__data__ = c.__data__), u[y] = _, Pe(u[y], e, n, y, u, vt(c, n)));
  return new Rt(a, this._parents, e, n);
}
function $a(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = tr(t));
  for (var r = this._groups, i = r.length, a = [], o = [], s = 0; s < i; ++s)
    for (var l = r[s], u = l.length, c, _ = 0; _ < u; ++_)
      if (c = l[_]) {
        for (var y = t.call(c, c.__data__, _, l), S, D = vt(c, n), E = 0, $ = y.length; E < $; ++E)
          (S = y[E]) && Pe(S, e, n, E, y, D);
        a.push(y), o.push(c);
      }
  return new Rt(a, o, e, n);
}
var ka = ce.prototype.constructor;
function Pa() {
  return new ka(this._groups, this._parents);
}
function Oa(t, e) {
  var n, r, i;
  return function() {
    var a = Ut(this, t), o = (this.style.removeProperty(t), Ut(this, t));
    return a === o ? null : a === n && o === r ? i : i = e(n = a, r = o);
  };
}
function Er(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Fa(t, e, n) {
  var r, i = n + "", a;
  return function() {
    var o = Ut(this, t);
    return o === i ? null : o === r ? a : a = e(r = o, n);
  };
}
function Xa(t, e, n) {
  var r, i, a;
  return function() {
    var o = Ut(this, t), s = n(this), l = s + "";
    return s == null && (l = s = (this.style.removeProperty(t), Ut(this, t))), o === l ? null : o === r && l === i ? a : (i = l, a = e(r = o, s));
  };
}
function Ba(t, e) {
  var n, r, i, a = "style." + e, o = "end." + a, s;
  return function() {
    var l = Ct(this, t), u = l.on, c = l.value[a] == null ? s || (s = Er(e)) : void 0;
    (u !== n || i !== c) && (r = (n = u).copy()).on(o, i = c), l.on = r;
  };
}
function Ya(t, e, n) {
  var r = (t += "") == "transform" ? Yo : vr;
  return e == null ? this.styleTween(t, Oa(t, r)).on("end.style." + t, Er(t)) : typeof e == "function" ? this.styleTween(t, Xa(t, r, ln(this, "style." + t, e))).each(Ba(this._id, t)) : this.styleTween(t, Fa(t, r, e), n).on("end.style." + t, null);
}
function Ha(t, e, n) {
  return function(r) {
    this.style.setProperty(t, e.call(this, r), n);
  };
}
function Ga(t, e, n) {
  var r, i;
  function a() {
    var o = e.apply(this, arguments);
    return o !== i && (r = (i = o) && Ha(t, o, n)), r;
  }
  return a._value = e, a;
}
function Ka(t, e, n) {
  var r = "style." + (t += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (e == null) return this.tween(r, null);
  if (typeof e != "function") throw new Error();
  return this.tween(r, Ga(t, e, n == null ? "" : n));
}
function Ua(t) {
  return function() {
    this.textContent = t;
  };
}
function Va(t) {
  return function() {
    var e = t(this);
    this.textContent = e == null ? "" : e;
  };
}
function qa(t) {
  return this.tween("text", typeof t == "function" ? Va(ln(this, "text", t)) : Ua(t == null ? "" : t + ""));
}
function Za(t) {
  return function(e) {
    this.textContent = t.call(this, e);
  };
}
function Qa(t) {
  var e, n;
  function r() {
    var i = t.apply(this, arguments);
    return i !== n && (e = (n = i) && Za(i)), e;
  }
  return r._value = t, r;
}
function Ja(t) {
  var e = "text";
  if (arguments.length < 1) return (e = this.tween(e)) && e._value;
  if (t == null) return this.tween(e, null);
  if (typeof t != "function") throw new Error();
  return this.tween(e, Qa(t));
}
function Wa() {
  for (var t = this._name, e = this._id, n = Sr(), r = this._groups, i = r.length, a = 0; a < i; ++a)
    for (var o = r[a], s = o.length, l, u = 0; u < s; ++u)
      if (l = o[u]) {
        var c = vt(l, e);
        Pe(l, t, n, u, o, {
          time: c.time + c.delay + c.duration,
          delay: 0,
          duration: c.duration,
          ease: c.ease
        });
      }
  return new Rt(r, this._parents, t, n);
}
function ja() {
  var t, e, n = this, r = n._id, i = n.size();
  return new Promise(function(a, o) {
    var s = { value: o }, l = { value: function() {
      --i === 0 && a();
    } };
    n.each(function() {
      var u = Ct(this, r), c = u.on;
      c !== t && (e = (t = c).copy(), e._.cancel.push(s), e._.interrupt.push(s), e._.end.push(l)), u.on = e;
    }), i === 0 && a();
  });
}
var ts = 0;
function Rt(t, e, n, r) {
  this._groups = t, this._parents = e, this._name = n, this._id = r;
}
function Sr() {
  return ++ts;
}
var Mt = ce.prototype;
Rt.prototype = {
  constructor: Rt,
  select: za,
  selectAll: $a,
  selectChild: Mt.selectChild,
  selectChildren: Mt.selectChildren,
  filter: Na,
  merge: La,
  selection: Pa,
  transition: Wa,
  call: Mt.call,
  nodes: Mt.nodes,
  node: Mt.node,
  size: Mt.size,
  empty: Mt.empty,
  each: Mt.each,
  on: Ra,
  attr: fa,
  attrTween: ma,
  style: Ya,
  styleTween: Ka,
  text: qa,
  textTween: Ja,
  remove: Da,
  tween: ia,
  delay: wa,
  duration: Ea,
  ease: ba,
  easeVarying: Ca,
  end: ja,
  [Symbol.iterator]: Mt[Symbol.iterator]
};
function es(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var ns = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: es
};
function rs(t, e) {
  for (var n; !(n = t.__transition) || !(n = n[e]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${e} not found`);
  return n;
}
function is(t) {
  var e, n;
  t instanceof Rt ? (e = t._id, t = t._name) : (e = Sr(), (n = ns).time = sn(), t = t == null ? null : t + "");
  for (var r = this._groups, i = r.length, a = 0; a < i; ++a)
    for (var o = r[a], s = o.length, l, u = 0; u < s; ++u)
      (l = o[u]) && Pe(l, t, e, u, o, n || rs(l, e));
  return new Rt(r, this._parents, t, e);
}
ce.prototype.interrupt = ea;
ce.prototype.transition = is;
const xe = (t) => () => t;
function os(t, {
  sourceEvent: e,
  target: n,
  transform: r,
  dispatch: i
}) {
  Object.defineProperties(this, {
    type: { value: t, enumerable: !0, configurable: !0 },
    sourceEvent: { value: e, enumerable: !0, configurable: !0 },
    target: { value: n, enumerable: !0, configurable: !0 },
    transform: { value: r, enumerable: !0, configurable: !0 },
    _: { value: i }
  });
}
function At(t, e, n) {
  this.k = t, this.x = e, this.y = n;
}
At.prototype = {
  constructor: At,
  scale: function(t) {
    return t === 1 ? this : new At(this.k * t, this.x, this.y);
  },
  translate: function(t, e) {
    return t === 0 & e === 0 ? this : new At(this.k, this.x + this.k * t, this.y + this.k * e);
  },
  apply: function(t) {
    return [t[0] * this.k + this.x, t[1] * this.k + this.y];
  },
  applyX: function(t) {
    return t * this.k + this.x;
  },
  applyY: function(t) {
    return t * this.k + this.y;
  },
  invert: function(t) {
    return [(t[0] - this.x) / this.k, (t[1] - this.y) / this.k];
  },
  invertX: function(t) {
    return (t - this.x) / this.k;
  },
  invertY: function(t) {
    return (t - this.y) / this.k;
  },
  rescaleX: function(t) {
    return t.copy().domain(t.range().map(this.invertX, this).map(t.invert, t));
  },
  rescaleY: function(t) {
    return t.copy().domain(t.range().map(this.invertY, this).map(t.invert, t));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
var re = new At(1, 0, 0);
At.prototype;
function He(t) {
  t.stopImmediatePropagation();
}
function te(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function as(t) {
  return (!t.ctrlKey || t.type === "wheel") && !t.button;
}
function ss() {
  var t = this;
  return t instanceof SVGElement ? (t = t.ownerSVGElement || t, t.hasAttribute("viewBox") ? (t = t.viewBox.baseVal, [[t.x, t.y], [t.x + t.width, t.y + t.height]]) : [[0, 0], [t.width.baseVal.value, t.height.baseVal.value]]) : [[0, 0], [t.clientWidth, t.clientHeight]];
}
function Yn() {
  return this.__zoom || re;
}
function cs(t) {
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * (t.ctrlKey ? 10 : 1);
}
function ls() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function us(t, e, n) {
  var r = t.invertX(e[0][0]) - n[0][0], i = t.invertX(e[1][0]) - n[1][0], a = t.invertY(e[0][1]) - n[0][1], o = t.invertY(e[1][1]) - n[1][1];
  return t.translate(
    i > r ? (r + i) / 2 : Math.min(0, r) || Math.max(0, i),
    o > a ? (a + o) / 2 : Math.min(0, a) || Math.max(0, o)
  );
}
function Hn() {
  var t = as, e = ss, n = us, r = cs, i = ls, a = [0, 1 / 0], o = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], s = 250, l = Vo, u = on("start", "zoom", "end"), c, _, y, S = 500, D = 150, E = 0, $ = 10;
  function x(d) {
    d.property("__zoom", Yn).on("wheel.zoom", O, { passive: !1 }).on("mousedown.zoom", B).on("dblclick.zoom", st).filter(i).on("touchstart.zoom", rt).on("touchmove.zoom", H).on("touchend.zoom touchcancel.zoom", dt).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  x.transform = function(d, b, g, v) {
    var N = d.selection ? d.selection() : d;
    N.property("__zoom", Yn), d !== N ? J(d, b, g, v) : N.interrupt().each(function() {
      q(this, arguments).event(v).start().zoom(null, typeof b == "function" ? b.apply(this, arguments) : b).end();
    });
  }, x.scaleBy = function(d, b, g, v) {
    x.scaleTo(d, function() {
      var N = this.__zoom.k, L = typeof b == "function" ? b.apply(this, arguments) : b;
      return N * L;
    }, g, v);
  }, x.scaleTo = function(d, b, g, v) {
    x.transform(d, function() {
      var N = e.apply(this, arguments), L = this.__zoom, R = g == null ? F(N) : typeof g == "function" ? g.apply(this, arguments) : g, k = L.invert(R), z = typeof b == "function" ? b.apply(this, arguments) : b;
      return n(K(X(L, z), R, k), N, o);
    }, g, v);
  }, x.translateBy = function(d, b, g, v) {
    x.transform(d, function() {
      return n(this.__zoom.translate(
        typeof b == "function" ? b.apply(this, arguments) : b,
        typeof g == "function" ? g.apply(this, arguments) : g
      ), e.apply(this, arguments), o);
    }, null, v);
  }, x.translateTo = function(d, b, g, v, N) {
    x.transform(d, function() {
      var L = e.apply(this, arguments), R = this.__zoom, k = v == null ? F(L) : typeof v == "function" ? v.apply(this, arguments) : v;
      return n(re.translate(k[0], k[1]).scale(R.k).translate(
        typeof b == "function" ? -b.apply(this, arguments) : -b,
        typeof g == "function" ? -g.apply(this, arguments) : -g
      ), L, o);
    }, v, N);
  };
  function X(d, b) {
    return b = Math.max(a[0], Math.min(a[1], b)), b === d.k ? d : new At(b, d.x, d.y);
  }
  function K(d, b, g) {
    var v = b[0] - g[0] * d.k, N = b[1] - g[1] * d.k;
    return v === d.x && N === d.y ? d : new At(d.k, v, N);
  }
  function F(d) {
    return [(+d[0][0] + +d[1][0]) / 2, (+d[0][1] + +d[1][1]) / 2];
  }
  function J(d, b, g, v) {
    d.on("start.zoom", function() {
      q(this, arguments).event(v).start();
    }).on("interrupt.zoom end.zoom", function() {
      q(this, arguments).event(v).end();
    }).tween("zoom", function() {
      var N = this, L = arguments, R = q(N, L).event(v), k = e.apply(N, L), z = g == null ? F(k) : typeof g == "function" ? g.apply(N, L) : g, j = Math.max(k[1][0] - k[0][0], k[1][1] - k[0][1]), G = N.__zoom, it = typeof b == "function" ? b.apply(N, L) : b, ct = l(G.invert(z).concat(j / G.k), it.invert(z).concat(j / it.k));
      return function(ut) {
        if (ut === 1) ut = it;
        else {
          var yt = ct(ut), It = j / yt[2];
          ut = new At(It, z[0] - yt[0] * It, z[1] - yt[1] * It);
        }
        R.zoom(null, ut);
      };
    });
  }
  function q(d, b, g) {
    return !g && d.__zooming || new P(d, b);
  }
  function P(d, b) {
    this.that = d, this.args = b, this.active = 0, this.sourceEvent = null, this.extent = e.apply(d, b), this.taps = 0;
  }
  P.prototype = {
    event: function(d) {
      return d && (this.sourceEvent = d), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(d, b) {
      return this.mouse && d !== "mouse" && (this.mouse[1] = b.invert(this.mouse[0])), this.touch0 && d !== "touch" && (this.touch0[1] = b.invert(this.touch0[0])), this.touch1 && d !== "touch" && (this.touch1[1] = b.invert(this.touch1[0])), this.that.__zoom = b, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(d) {
      var b = at(this.that).datum();
      u.call(
        d,
        this.that,
        new os(d, {
          sourceEvent: this.sourceEvent,
          target: x,
          transform: this.that.__zoom,
          dispatch: u
        }),
        b
      );
    }
  };
  function O(d, ...b) {
    if (!t.apply(this, arguments)) return;
    var g = q(this, b).event(d), v = this.__zoom, N = Math.max(a[0], Math.min(a[1], v.k * Math.pow(2, r.apply(this, arguments)))), L = $t(d);
    if (g.wheel)
      (g.mouse[0][0] !== L[0] || g.mouse[0][1] !== L[1]) && (g.mouse[1] = v.invert(g.mouse[0] = L)), clearTimeout(g.wheel);
    else {
      if (v.k === N) return;
      g.mouse = [L, v.invert(L)], Te(this), g.start();
    }
    te(d), g.wheel = setTimeout(R, D), g.zoom("mouse", n(K(X(v, N), g.mouse[0], g.mouse[1]), g.extent, o));
    function R() {
      g.wheel = null, g.end();
    }
  }
  function B(d, ...b) {
    if (y || !t.apply(this, arguments)) return;
    var g = d.currentTarget, v = q(this, b, !0).event(d), N = at(d.view).on("mousemove.zoom", z, !0).on("mouseup.zoom", j, !0), L = $t(d, g), R = d.clientX, k = d.clientY;
    xo(d.view), He(d), v.mouse = [L, this.__zoom.invert(L)], Te(this), v.start();
    function z(G) {
      if (te(G), !v.moved) {
        var it = G.clientX - R, ct = G.clientY - k;
        v.moved = it * it + ct * ct > E;
      }
      v.event(G).zoom("mouse", n(K(v.that.__zoom, v.mouse[0] = $t(G, g), v.mouse[1]), v.extent, o));
    }
    function j(G) {
      N.on("mousemove.zoom mouseup.zoom", null), vo(G.view, v.moved), te(G), v.event(G).end();
    }
  }
  function st(d, ...b) {
    if (t.apply(this, arguments)) {
      var g = this.__zoom, v = $t(d.changedTouches ? d.changedTouches[0] : d, this), N = g.invert(v), L = g.k * (d.shiftKey ? 0.5 : 2), R = n(K(X(g, L), v, N), e.apply(this, b), o);
      te(d), s > 0 ? at(this).transition().duration(s).call(J, R, v, d) : at(this).call(x.transform, R, v, d);
    }
  }
  function rt(d, ...b) {
    if (t.apply(this, arguments)) {
      var g = d.touches, v = g.length, N = q(this, b, d.changedTouches.length === v).event(d), L, R, k, z;
      for (He(d), R = 0; R < v; ++R)
        k = g[R], z = $t(k, this), z = [z, this.__zoom.invert(z), k.identifier], N.touch0 ? !N.touch1 && N.touch0[2] !== z[2] && (N.touch1 = z, N.taps = 0) : (N.touch0 = z, L = !0, N.taps = 1 + !!c);
      c && (c = clearTimeout(c)), L && (N.taps < 2 && (_ = z[0], c = setTimeout(function() {
        c = null;
      }, S)), Te(this), N.start());
    }
  }
  function H(d, ...b) {
    if (this.__zooming) {
      var g = q(this, b).event(d), v = d.changedTouches, N = v.length, L, R, k, z;
      for (te(d), L = 0; L < N; ++L)
        R = v[L], k = $t(R, this), g.touch0 && g.touch0[2] === R.identifier ? g.touch0[0] = k : g.touch1 && g.touch1[2] === R.identifier && (g.touch1[0] = k);
      if (R = g.that.__zoom, g.touch1) {
        var j = g.touch0[0], G = g.touch0[1], it = g.touch1[0], ct = g.touch1[1], ut = (ut = it[0] - j[0]) * ut + (ut = it[1] - j[1]) * ut, yt = (yt = ct[0] - G[0]) * yt + (yt = ct[1] - G[1]) * yt;
        R = X(R, Math.sqrt(ut / yt)), k = [(j[0] + it[0]) / 2, (j[1] + it[1]) / 2], z = [(G[0] + ct[0]) / 2, (G[1] + ct[1]) / 2];
      } else if (g.touch0) k = g.touch0[0], z = g.touch0[1];
      else return;
      g.zoom("touch", n(K(R, k, z), g.extent, o));
    }
  }
  function dt(d, ...b) {
    if (this.__zooming) {
      var g = q(this, b).event(d), v = d.changedTouches, N = v.length, L, R;
      for (He(d), y && clearTimeout(y), y = setTimeout(function() {
        y = null;
      }, S), L = 0; L < N; ++L)
        R = v[L], g.touch0 && g.touch0[2] === R.identifier ? delete g.touch0 : g.touch1 && g.touch1[2] === R.identifier && delete g.touch1;
      if (g.touch1 && !g.touch0 && (g.touch0 = g.touch1, delete g.touch1), g.touch0) g.touch0[1] = this.__zoom.invert(g.touch0[0]);
      else if (g.end(), g.taps === 2 && (R = $t(R, this), Math.hypot(_[0] - R[0], _[1] - R[1]) < $)) {
        var k = at(this).on("dblclick.zoom");
        k && k.apply(this, arguments);
      }
    }
  }
  return x.wheelDelta = function(d) {
    return arguments.length ? (r = typeof d == "function" ? d : xe(+d), x) : r;
  }, x.filter = function(d) {
    return arguments.length ? (t = typeof d == "function" ? d : xe(!!d), x) : t;
  }, x.touchable = function(d) {
    return arguments.length ? (i = typeof d == "function" ? d : xe(!!d), x) : i;
  }, x.extent = function(d) {
    return arguments.length ? (e = typeof d == "function" ? d : xe([[+d[0][0], +d[0][1]], [+d[1][0], +d[1][1]]]), x) : e;
  }, x.scaleExtent = function(d) {
    return arguments.length ? (a[0] = +d[0], a[1] = +d[1], x) : [a[0], a[1]];
  }, x.translateExtent = function(d) {
    return arguments.length ? (o[0][0] = +d[0][0], o[1][0] = +d[1][0], o[0][1] = +d[0][1], o[1][1] = +d[1][1], x) : [[o[0][0], o[0][1]], [o[1][0], o[1][1]]];
  }, x.constrain = function(d) {
    return arguments.length ? (n = d, x) : n;
  }, x.duration = function(d) {
    return arguments.length ? (s = +d, x) : s;
  }, x.interpolate = function(d) {
    return arguments.length ? (l = d, x) : l;
  }, x.on = function() {
    var d = u.on.apply(u, arguments);
    return d === u ? x : d;
  }, x.clickDistance = function(d) {
    return arguments.length ? (E = (d = +d) * d, x) : Math.sqrt(E);
  }, x.tapDistance = function(d) {
    return arguments.length ? ($ = +d, x) : $;
  }, x;
}
const nt = {
  DEFAULT_MIN_ZOOM: 0.1,
  DEFAULT_MAX_ZOOM: 4,
  FIT_TO_VIEW_MAX_ZOOM: 1,
  INITIAL_POSITION_X: 0,
  INITIAL_POSITION_Y: 0,
  SCROLL_POS_RATIO: 3,
  DEFAULT_LAYOUT: 100,
  INITIAL_SCROLLBAR_SIZE: 50,
  MIN_SCROLLBAR_SIZE: 15,
  SCROLL_DELTA_DIFF: 1.5,
  // max gap (ms) between wheel events that still counts as the same gesture
  WHEEL_GESTURE_TIMEOUT: 200
}, De = {
  TOP_LEFT: "top-left",
  TOP_RIGHT: "top-right",
  BOTTOM_LEFT: "bottom-left",
  BOTTOM_CENTER: "bottom-center"
}, mt = {
  ...De,
  TOP_CENTER: "top-center",
  BOTTOM_RIGHT: "bottom-right",
  CENTER_LEFT: "center-left",
  CENTER_RIGHT: "center-right",
  CENTER_CENTER: "center-center"
}, _t = {
  BLOCK_EVENTS: "react-infinite-canvas-block-events",
  BLOCK_SCROLL_CLASS: "react-infinite-canvas-block-scroll",
  BLOCK_ZOOM_CLASS: "react-infinite-canvas-block-zoom",
  BLOCK_PAN_CLASS: "react-infinite-canvas-block-pan",
  BLOCK_DOUBLE_CLICK_CLASS: "react-infinite-canvas-block-double-click"
}, Dt = {
  LEFT: 0,
  MIDDLE: 1,
  RIGHT: 2
}, Ht = {
  SELECTABLE: "react-infinite-canvas-selectable",
  SELECTED: "react-infinite-canvas-selected"
}, zt = {
  DRAGGABLE: "react-infinite-canvas-draggable",
  HANDLE: "react-infinite-canvas-drag-handle",
  DRAGGING: "react-infinite-canvas-dragging",
  DROPPABLE: "react-infinite-canvas-droppable",
  DROP_TARGET: "react-infinite-canvas-drop-target"
}, ze = typeof navigator < "u" && /^((?!chrome|android).)*safari/i.test(navigator.userAgent), Ge = (t, { timeout: e } = {}) => {
  typeof window.requestIdleCallback == "function" ? window.requestIdleCallback(t, { timeout: e }) : window.setTimeout(t, 1);
}, fs = (t) => {
  const e = t.getBoundingClientRect();
  let [n, r, i, a] = [
    Number.POSITIVE_INFINITY,
    Number.POSITIVE_INFINITY,
    Number.NEGATIVE_INFINITY,
    Number.NEGATIVE_INFINITY
  ];
  const o = (s) => {
    s.width === 0 && s.height === 0 || (n = Math.min(n, s.left), r = Math.min(r, s.top), i = Math.max(i, s.right), a = Math.max(a, s.bottom));
  };
  o(e);
  for (const s of Array.from(t.getElementsByTagName("*")))
    o(s.getBoundingClientRect());
  return n > i || r > a ? e : { left: n, top: r, width: i - n, height: a - r };
}, Xt = ({
  value: t,
  min: e = 0,
  max: n
}) => Math.min(Math.max(t, e), n), hs = ({
  position: t,
  svgBounds: e,
  nodeBounds: n,
  currentTranslateX: r,
  currentTranslateY: i,
  currentScale: a,
  updatedScale: o,
  customOffset: s
}) => {
  let [l, u, c] = [0, 0, 1];
  switch (o !== a && (c = o / a, r *= c, i *= c), t) {
    case mt.TOP_LEFT:
      return {
        updatedX: r + ((e.x - n.x) * c + s.x),
        updatedY: i + ((e.y - n.y) * c + s.y)
      };
    case mt.TOP_CENTER:
      return l = e.width / 2 - (n.x * c + n.width * c / 2) + e.x, {
        updatedX: r + l + s.x,
        updatedY: i + ((e.y - n.y) * c + s.y)
      };
    case mt.TOP_RIGHT:
      return {
        updatedX: r + (e.width - (Math.abs(e.x - n.x * c) + n.width * c)) + s.x,
        updatedY: i + ((e.y - n.y) * c + s.y)
      };
    case mt.CENTER_LEFT:
      return u = e.height / 2 - (Math.abs(e.y - n.y) * c + n.height * c / 2), {
        updatedX: r + ((e.x - n.x) * c + s.x),
        updatedY: i + u + s.y
      };
    case mt.CENTER_CENTER:
      return l = e.width / 2 - (Math.abs(e.x - n.x) * c + n.width * c / 2), u = e.height / 2 - (Math.abs(e.y - n.y) * c + n.height * c / 2), {
        updatedX: r + l + s.x,
        updatedY: i + u + s.y
      };
    case mt.CENTER_RIGHT:
      return u = e.height / 2 - (Math.abs(e.y - n.y) * c + n.height * c / 2), {
        updatedX: r + (e.width - (Math.abs(e.x - n.x) * c + n.width * c)) + s.x,
        updatedY: i + u + s.y
      };
    case mt.BOTTOM_LEFT:
      return {
        updatedX: r + ((e.x - n.x) * c + s.x),
        updatedY: i + (e.height - (Math.abs(e.y - n.y) * c + n.height * c)) + s.y
      };
    case mt.BOTTOM_CENTER:
      return l = e.width / 2 - (Math.abs(e.x - n.x) * c + n.width * c / 2), {
        updatedX: r + l + s.x,
        updatedY: i + (e.height - (Math.abs(e.y - n.y) * c + n.height * c)) + s.y
      };
    case mt.BOTTOM_RIGHT:
      return {
        updatedX: r + (e.width - (Math.abs(e.x - n.x) * c + n.width * c)) + s.x,
        updatedY: i + (e.height - (Math.abs(e.y - n.y) * c + n.height)) + s.y
      };
    default:
      return {
        updatedX: r,
        updatedY: i
      };
  }
}, Gn = (t) => {
  const [e, n] = [Math.max(t - 0.2, 0.2), t];
  return [
    nt.INITIAL_SCROLLBAR_SIZE / e,
    nt.INITIAL_SCROLLBAR_SIZE / n
  ];
}, ds = ({
  isVertical: t,
  state: e,
  scrollDelta: n
}) => {
  const r = t ? e.verticalPos : e.horizontalPos, i = t ? e.verticalSize : e.horizontalSize, a = t ? e.verticalSizeDecrease : e.horizontalSizeDecrease, o = t ? n.deltaY : n.deltaX;
  return { scrollPos: r, scrollSize: i, scrollSizeDecrease: a, deltaValue: o };
}, Kn = ({
  isVertical: t = !0,
  state: e,
  scrollDelta: n,
  scrollLength: r
}) => {
  const { scrollPos: i, scrollSize: a, scrollSizeDecrease: o, deltaValue: s } = ds({
    isVertical: t,
    state: e,
    scrollDelta: n
  }), l = s / 10 || 0, u = s / 100 || 0;
  let [c, _] = [
    i + l,
    o
  ];
  if (c < 1)
    c = 0, _ -= Math.abs(u);
  else if (c + a > r) {
    const y = r - Math.max(
      nt.MIN_SCROLLBAR_SIZE,
      a - Math.abs(_)
    );
    c = Math.min(
      r - (a + _),
      y
    ), _ -= u;
  } else if (_ !== 0) {
    const y = c > r / 2;
    c = y ? r - a : 0, y ? (_ -= u, _ <= 0 && (_ = 0)) : (_ += Math.abs(u), _ >= 0 && (_ = 0));
  }
  return [c, _];
}, ps = (t, e, n, r) => t && e && n && r ? `${_t.BLOCK_EVENTS}` : [
  t && `${_t.BLOCK_SCROLL_CLASS}`,
  e && `${_t.BLOCK_ZOOM_CLASS}`,
  n && `${_t.BLOCK_PAN_CLASS}`,
  r && `${_t.BLOCK_DOUBLE_CLICK_CLASS}`
].filter(Boolean).join(" "), ve = (t) => {
  const e = t.target;
  return !!(e.closest(`.${_t.BLOCK_PAN_CLASS}`) || e.closest(`.${_t.BLOCK_EVENTS}`));
}, Un = (t) => {
  const e = t.target;
  return !!(e.closest(`.${_t.BLOCK_DOUBLE_CLICK_CLASS}`) || e.closest(`.${_t.BLOCK_EVENTS}`));
}, gs = (t) => {
  const e = t.target;
  if (e.closest(`.${_t.BLOCK_EVENTS}`)) return !0;
  const n = t.ctrlKey || t.metaKey;
  return !!(!n && e.closest(`.${_t.BLOCK_SCROLL_CLASS}`) || n && e.closest(`.${_t.BLOCK_ZOOM_CLASS}`));
}, ms = "_dotSvgContainer_17kjy_1", _s = "_cssPattern_17kjy_9", Ke = {
  dotSvgContainer: ms,
  cssPattern: _s
}, ys = ({
  id: t = "",
  size: e = 1,
  minSize: n = 0.3,
  maxZoom: r = 4,
  gap: i = 20,
  zoomTransform: a = {
    scale: 1,
    translateX: 0,
    translateY: 0
  },
  className: o = "",
  minOpacity: s = 0.8,
  maxOpacity: l = 1,
  elementColor: u = "#afb7c7",
  backgroundColor: c
}) => {
  const { scale: _, translateX: y, translateY: S } = a, D = Xt({
    value: _ * 10 / (r * 10),
    min: s,
    max: l
  }), E = i * _, $ = e * _, x = Math.max(n, $), X = `patternId-${t}`;
  return ze ? /* @__PURE__ */ V(
    "div",
    {
      className: `${o} ${Ke.dotSvgContainer}`,
      style: c ? { backgroundColor: c } : {},
      role: "img",
      "aria-label": "Background pattern",
      children: /* @__PURE__ */ V(
        "div",
        {
          className: Ke.cssPattern,
          style: {
            opacity: D,
            backgroundImage: `radial-gradient(circle at ${x}px ${x}px, ${u} ${x}px, transparent ${x}px)`,
            backgroundSize: `${E}px ${E}px`,
            backgroundPosition: `${y % E}px ${S % E}px`
          }
        }
      )
    }
  ) : /* @__PURE__ */ Ce(
    "svg",
    {
      className: `${o} ${Ke.dotSvgContainer}`,
      style: c ? { backgroundColor: c } : {},
      role: "img",
      "aria-label": "Background pattern",
      children: [
        /* @__PURE__ */ V(
          "pattern",
          {
            id: X,
            x: y % E,
            y: S % E,
            width: E,
            height: E,
            patternUnits: "userSpaceOnUse",
            patternTransform: `translate(-${$},-${$})`,
            children: /* @__PURE__ */ V(
              "circle",
              {
                cx: x,
                cy: x,
                r: x,
                fill: u,
                opacity: D
              }
            )
          }
        ),
        /* @__PURE__ */ V(
          "rect",
          {
            x: "0",
            y: "0",
            width: "100%",
            height: "100%",
            fill: `url(#${X})`
          }
        )
      ]
    }
  );
}, ws = "_container_1pga7_1", xs = "_canvasWrapper_1pga7_8", vs = "_panning_1pga7_21", Es = "_selectionMode_1pga7_25", Ss = "_previewMode_1pga7_29", bs = "_selectionBox_1pga7_53", Ts = "_canvas_1pga7_8", Cs = "_contentWrapper_1pga7_83", bt = {
  container: ws,
  canvasWrapper: xs,
  panning: vs,
  selectionMode: Es,
  previewMode: Ss,
  selectionBox: bs,
  canvas: Ts,
  contentWrapper: Cs
}, Ns = "_verticalScrollBar_17thb_1", Ls = "_horizontalScrollBar_17thb_9", Vn = {
  verticalScrollBar: Ns,
  horizontalScrollBar: Ls
}, Ms = Zn(
  ({
    scale: t,
    startingPosition: e,
    offset: n = { x: 0, y: 0 },
    color: r = "gray",
    thickness: i = "8px",
    minSize: a = "15px",
    verticalOffsetHeight: o,
    horizontalOffsetWidth: s,
    onScrollDeltaHandler: l,
    getContainerOffset: u
  }, c) => {
    const [_, y] = Gn(t), S = et(null), D = et(null), E = et({
      isDragging: !1,
      vertical: !0,
      initialOffset: 0
    }), [$, x] = Qn({
      scale: t,
      horizontalSize: y,
      horizontalPos: e ? e.x : (s != null ? s : 0) / nt.SCROLL_POS_RATIO,
      horizontalSizeDecrease: 0,
      verticalSize: _,
      verticalPos: e ? e.y : (o != null ? o : 0) / nt.SCROLL_POS_RATIO,
      verticalSizeDecrease: 0
    });
    Jn(c, () => ({
      resetScrollPos: () => {
        x((P) => ({
          ...P,
          horizontalPos: (s != null ? s : 0) / nt.SCROLL_POS_RATIO,
          verticalPos: (o != null ? o : 0) / nt.SCROLL_POS_RATIO,
          verticalSizeDecrease: 0,
          horizontalSizeDecrease: 0
        }));
      },
      onScrollDeltaChangeHandler: X,
      onMouseUp: F
    })), Gt(
      function() {
        x((O) => {
          let B;
          const [st, rt] = Gn(t), H = t / O.scale || 0;
          return t < O.scale ? (B = {
            horizontalPos: O.horizontalPos - H,
            verticalPos: O.verticalPos - H
          }, {
            ...O,
            scale: t,
            horizontalSize: rt,
            verticalSize: st,
            ...B
          }) : (B = {
            horizontalPos: O.horizontalPos + H,
            verticalPos: O.verticalPos + H
          }, {
            ...O,
            scale: t,
            horizontalSize: rt,
            verticalSize: st,
            ...B
          });
        });
      },
      [t]
    );
    function X(P) {
      E.current.isDragging || x((O) => {
        const [B, st] = Kn({
          state: O,
          scrollDelta: P,
          scrollLength: o != null ? o : 0
        }), [rt, H] = Kn({
          isVertical: !1,
          state: O,
          scrollDelta: P,
          scrollLength: s != null ? s : 0
        });
        return {
          ...O,
          horizontalPos: rt,
          horizontalSizeDecrease: H,
          verticalPos: B,
          verticalSizeDecrease: st
        };
      });
    }
    const K = U(
      function(O, B) {
        if (!E.current.isDragging) return;
        O.stopPropagation();
        const { movementX: st, movementY: rt, clientX: H, clientY: dt, offsetX: d, offsetY: b } = O;
        E.current.initialOffset < 1 && (E.current.initialOffset = B ? b : d);
        const g = B ? rt : st, v = (B ? dt : H) - E.current.initialOffset - u(B), N = (z) => B ? [
          "verticalPos",
          z.verticalSize,
          o != null ? o : 0,
          n.y
        ] : [
          "horizontalPos",
          z.horizontalSize,
          s != null ? s : 0,
          n.x
        ];
        x((z) => {
          const [j, G, it, ct] = N(z);
          return {
            ...z,
            [j]: Xt({
              value: v,
              min: ct,
              max: it - G
            })
          };
        });
        const L = () => {
          const z = g > 0 ? g + nt.SCROLL_DELTA_DIFF : g - nt.SCROLL_DELTA_DIFF;
          return B ? { deltaX: 0, deltaY: z } : {
            deltaX: z,
            deltaY: 0
          };
        }, R = (B ? o != null ? o : 0 : s != null ? s : 0) - (B ? $.verticalSize : $.horizontalSize);
        !(v <= 0 || v >= R) && g !== 0 && l(L());
      },
      [o, s, n.y, n.x]
    ), F = U(
      function() {
        E.current.isDragging = !1, E.current.initialOffset = 0, window.removeEventListener(
          "mousemove",
          (O) => K(O, E.current.vertical)
        ), window.removeEventListener("mouseup", F);
      },
      [K]
    ), J = U(
      function() {
        window.addEventListener(
          "mousemove",
          (O) => K(O, E.current.vertical)
        ), window.addEventListener("mouseup", F);
      },
      [K, F]
    ), q = (P) => {
      P.stopPropagation();
    };
    return /* @__PURE__ */ Ce($r, { children: [
      /* @__PURE__ */ V(
        "div",
        {
          className: Vn.verticalScrollBar,
          style: { width: i },
          ref: S,
          children: /* @__PURE__ */ V(
            "div",
            {
              "data-id": "vertical-scrollbar",
              style: {
                insetBlockStart: `${Xt({
                  value: $.verticalPos,
                  min: n.y,
                  max: o
                })}px`,
                height: `${$.verticalSize + $.verticalSizeDecrease}px`,
                background: r,
                minHeight: a
              },
              onMouseDownCapture: (P) => {
                P.stopPropagation(), E.current = {
                  ...E.current,
                  isDragging: !0,
                  vertical: !0
                }, J();
              },
              onDragEnterCapture: q,
              onDragCapture: q,
              onDragEndCapture: q
            }
          )
        }
      ),
      /* @__PURE__ */ V(
        "div",
        {
          className: Vn.horizontalScrollBar,
          ref: D,
          style: { height: i },
          children: /* @__PURE__ */ V(
            "div",
            {
              "data-id": "horizontal-scrollbar",
              style: {
                insetInlineStart: `${Xt({
                  value: $.horizontalPos,
                  min: n.x,
                  max: s
                })}px`,
                width: `${$.horizontalSize + $.horizontalSizeDecrease}px`,
                background: r,
                minWidth: a
              },
              onMouseDownCapture: (P) => {
                P.stopPropagation(), E.current = {
                  ...E.current,
                  isDragging: !0,
                  vertical: !1
                }, J();
              },
              onDragEnterCapture: q,
              onDragCapture: q,
              onDragEndCapture: q
            }
          )
        }
      )
    ] });
  }
), Ue = ze ? 600 : 300, zs = Zn(
  ({ children: t, ...e }, n) => {
    const r = qn.useRef(null);
    return /* @__PURE__ */ V(As, { innerRef: n, ...e, children: /* @__PURE__ */ V(
      "div",
      {
        ref: r,
        style: { width: "max-content", height: "max-content" },
        children: t
      }
    ) });
  }
), As = kr(
  ({
    children: t,
    className: e = "",
    innerRef: n,
    minZoom: r = nt.DEFAULT_MIN_ZOOM,
    maxZoom: i = nt.DEFAULT_MAX_ZOOM,
    panOnScroll: a = !0,
    panConfig: o = {},
    selectionConfig: s = {},
    dragConfig: l = {},
    previewMode: u = !1,
    onDoubleClick: c,
    customComponents: _ = [],
    scrollBarConfig: y = {},
    backgroundConfig: S = {},
    onCanvasMount: D = () => {
    }
  }) => {
    var hn, dn, pn, gn, mn, _n;
    const E = et(null), $ = et(null), x = et(null), X = et(null), K = et(null), F = t.ref, J = et(null), q = (hn = o.button) != null ? hn : Dt.LEFT, P = (dn = s.enabled) != null ? dn : !1, O = (pn = s.button) != null ? pn : Dt.LEFT, B = (gn = l.enabled) != null ? gn : !1, st = (mn = l.button) != null ? mn : Dt.LEFT, rt = et({
      panButton: q,
      selectionEnabled: P,
      selectionButton: O,
      dragEnabled: B,
      dragButton: st,
      previewMode: u,
      hasDoubleClickHandler: !!c
    });
    rt.current = {
      panButton: q,
      selectionEnabled: P,
      selectionButton: O,
      dragEnabled: B,
      dragButton: st,
      previewMode: u,
      hasDoubleClickHandler: !!c
    };
    const H = et(s);
    H.current = s;
    const dt = et(l);
    dt.current = l;
    const d = et(null), b = et(null), g = et(null), v = et(null), N = Wn(() => Hn().scaleExtent([
      r,
      i
    ]), [i, r]), L = et(at(x.current).call(N)), [R, k] = Qn({
      translateX: 0,
      translateY: 0,
      scale: 1
    });
    Jn(n, () => ({
      scrollNodeToCenter: ({
        nodeElement: f,
        offset: p,
        scale: h,
        shouldUpdateMaxScale: m,
        maxScale: w,
        transitionDuration: T
      }) => G({
        nodeElement: f,
        offset: p,
        scale: h,
        shouldUpdateMaxScale: m,
        maxScale: w,
        transitionDuration: T,
        position: mt.CENTER_CENTER
      }),
      scrollNodeHandler: G,
      scrollContentHorizontallyCenter: it,
      fitContentToView: j,
      getCanvasState: ct
    })), Gt(function() {
      L.current = at(x.current).call(N);
      const p = at(X.current);
      $.current = E.current ? E.current.getBoundingClientRect() : null, N.filter(
        (h) => {
          var I, Z, Q;
          const {
            panButton: m,
            selectionEnabled: w,
            selectionButton: T,
            previewMode: C,
            hasDoubleClickHandler: M
          } = rt.current;
          if (C) return !1;
          const A = h.target;
          if (A && ve({ target: A }) || h.type === "dblclick" && A && Un({ target: A }))
            return !1;
          if (h.type === "wheel") return h.ctrlKey;
          if (h.type === "dblclick" && M)
            return !1;
          if (h.type === "mousedown" || h.type === "dblclick") {
            const Y = (I = h.button) != null ? I : Dt.LEFT;
            if (h.type === "mousedown" && rt.current.dragEnabled && Y === rt.current.dragButton && Zt((Z = h.target) != null ? Z : null) || w && Y === T && br((Q = h.target) != null ? Q : null) || Y !== m) return !1;
          }
          return h.type === "mousedown" && !J.current && (J.current = !0, ut()), !0;
        }
      ).on(
        "zoom",
        (h) => {
          var A, I;
          ((A = h.sourceEvent) == null ? void 0 : A.ctrlKey) === !1 && h.type === "zoom" && ((I = E.current) == null || I.classList.add(bt.panning));
          const m = h.transform, { x: w, y: T, k: C } = m, M = X.current;
          k({ translateX: w, translateY: T, scale: C }), ze && M ? M.style.transform = `translate3d(${w}px, ${T}px, 0) scale(${C})` : p.attr(
            "transform",
            `translate(${w},${T}) scale(${C})`
          );
        }
      ), N.on("end", () => {
        var h;
        J.current = !1, (h = E.current) == null || h.classList.remove(bt.panning);
      }), D({
        scrollNodeToCenter: ({
          nodeElement: h,
          offset: m,
          scale: w,
          shouldUpdateMaxScale: T,
          maxScale: C,
          transitionDuration: M
        }) => G({
          nodeElement: h,
          offset: m,
          scale: w,
          shouldUpdateMaxScale: T,
          maxScale: C,
          transitionDuration: M,
          position: mt.CENTER_CENTER
        }),
        scrollNodeHandler: G,
        scrollContentHorizontallyCenter: it,
        fitContentToView: j,
        getCanvasState: ct
      });
    }, []), L.current.call(Hn).on(
      "wheel.zoom",
      (f) => {
        var T;
        if (u) return;
        const p = d.current, m = p !== null && f.timeStamp - p.lastTime < nt.WHEEL_GESTURE_TIMEOUT ? p.blocked : gs({
          ...f,
          target: f.target
        });
        if (d.current = {
          lastTime: f.timeStamp,
          blocked: m
        }, m)
          return;
        f.preventDefault();
        const w = L.current.property("__zoom").k || 1;
        if (a && !f.ctrlKey) {
          const C = {
            deltaX: f.deltaX,
            deltaY: f.deltaY
          };
          (T = K.current) == null || T.onScrollDeltaChangeHandler(C), z(C);
        } else {
          const C = w * 2 ** (-f.deltaY * 0.01), M = L.current;
          M && N.scaleTo(
            M,
            C,
            $t(f)
          );
        }
      },
      { passive: !1, capture: !0 }
    );
    const z = (f) => {
      const p = L.current.property("__zoom").k || 1, h = L.current;
      h && N.translateBy(
        h,
        -(f.deltaX / p),
        -(f.deltaY / p)
      );
    }, j = U(
      function({
        duration: p = 500,
        offset: h = { x: 0, y: 0 },
        scale: m,
        maxZoomLimit: w = nt.FIT_TO_VIEW_MAX_ZOOM,
        disableVerticalCenter: T = !1
      }) {
        Ge(
          () => {
            var xn, vn, En, Sn, bn;
            if (!F.current) return;
            const C = at(x.current), M = fs(F.current), A = (xn = L.current.property("__zoom")) != null ? xn : {}, { x: I = 0, y: Z = 0 } = A, Q = A.k || 1, Y = (vn = x.current) == null ? void 0 : vn.getBoundingClientRect(), { width: W = 0, height: tt = 0 } = Y || {}, ft = 1 / Q, Nt = M.width * ft, Et = M.height * ft, St = (M.left - ((En = Y == null ? void 0 : Y.left) != null ? En : 0) - I) * ft, pt = (M.top - ((Sn = Y == null ? void 0 : Y.top) != null ? Sn : 0) - Z) * ft, ot = tt / Et, wt = W / Nt, Lt = m != null ? m : Xt({
              value: Math.min(
                w,
                Math.min(ot, wt)
              ),
              min: r,
              max: i
            }), ge = W - Nt * Lt, gt = tt - Et * Lt, me = !T && ot > wt, Ir = ge / 2 - St * Lt, Dr = (me ? gt / 2 : 0) - pt * Lt, yn = Ir + h.x, wn = Dr + h.y, zr = re.translate(yn, wn).scale(Lt);
            k({ translateX: yn, translateY: wn, scale: Lt }), (bn = K.current) == null || bn.resetScrollPos(), C.transition().duration(p).call(N.transform, zr);
          },
          { timeout: Ue }
        );
      },
      [i, r]
    );
    Gt(
      function() {
        u && j({});
      },
      [u, j]
    );
    const G = ({
      nodeElement: f,
      offset: p = { x: 0, y: 0 },
      scale: h,
      shouldUpdateMaxScale: m = !0,
      maxScale: w,
      transitionDuration: T = 300,
      position: C = mt.TOP_CENTER
    }) => {
      Ge(
        () => {
          if (!f) return;
          const M = L.current.property("__zoom"), {
            k: A,
            x: I,
            y: Z
          } = M, Q = at(x.current), W = (() => {
            const pt = (wt) => w ? Math.min(w, wt) : wt;
            if (!h) return pt(A);
            let ot = h;
            return m && (ot = Math.max(h, A)), pt(ot);
          })(), tt = x.current.getBoundingClientRect(), ft = f.getBoundingClientRect(), { updatedX: Nt, updatedY: Et } = hs({
            position: C,
            svgBounds: tt,
            nodeBounds: ft,
            currentTranslateX: I,
            currentTranslateY: Z,
            currentScale: A,
            updatedScale: W,
            customOffset: { x: p.x, y: p.y }
          }), St = re.translate(Nt, Et).scale(W);
          Q.transition().duration(T).call(N.transform, St);
        },
        { timeout: Ue }
      );
    }, it = ({
      offset: f = 0,
      transitionDuration: p = 300
    }) => {
      F.current && Ge(
        () => {
          const h = L.current.property("__zoom"), { k: m, y: w } = h, T = at(x.current), C = x.current.getBoundingClientRect(), M = F.current.getBoundingClientRect(), A = 1 / m, I = M.width * A, Z = (C.width - I * m) / 2 + f;
          k({
            ...R,
            translateX: Z
          });
          const Q = re.translate(Z, w).scale(m);
          T.transition().duration(p).call(N.transform, Q);
        },
        { timeout: Ue }
      );
    }, ct = () => ({
      canvasNode: at(x.current),
      zoomNode: at(X.current),
      currentPosition: L.current.property("__zoom"),
      d3Zoom: N
    }), ut = () => {
      const f = document.body;
      if (f) {
        const p = new MouseEvent("mousedown", {
          bubbles: !0,
          cancelable: !0,
          view: window
        });
        f.dispatchEvent(p);
      }
    }, yt = U(function(p = !0) {
      var m, w;
      const h = $.current;
      return p ? (m = h == null ? void 0 : h.top) != null ? m : 0 : (w = h == null ? void 0 : h.left) != null ? w : 0;
    }, []), It = U(() => {
      var h, m;
      const f = (h = H.current.selectableSelector) != null ? h : `.${Ht.SELECTABLE}`, p = (m = F.current) != null ? m : E.current;
      return p ? Array.from(p.querySelectorAll(f)) : [];
    }, [F]), qt = U(
      (f) => {
        var w, T;
        const p = (w = H.current.selectableSelector) != null ? w : `.${Ht.SELECTABLE}`;
        if (!(f instanceof Element)) return null;
        const h = f.closest(p), m = (T = F.current) != null ? T : E.current;
        return h && (m != null && m.contains(h)) ? h : null;
      },
      [F]
    ), Pt = U(
      (f, p) => {
        var w;
        if (!(f instanceof Element)) return null;
        const h = f.closest(p), m = (w = F.current) != null ? w : E.current;
        return h && (m != null && m.contains(h)) ? h : null;
      },
      [F]
    ), Oe = U(
      (f) => {
        const p = H.current.clickableSelector;
        if (!p) return null;
        const h = Pt(f, p), m = qt(f);
        return h && (m != null && m.contains(h)) ? m : null;
      },
      [Pt, qt]
    ), br = U(
      (f) => !qt(f) || !!Oe(f),
      [Oe, qt]
    ), Zt = U(
      (f) => {
        var w;
        const p = dt.current, h = Pt(
          f,
          (w = p.draggableSelector) != null ? w : `.${zt.DRAGGABLE}`
        );
        if (!h || !p.dragHandleSelector) return h;
        const m = Pt(f, p.dragHandleSelector);
        return m && h.contains(m) ? h : null;
      },
      [Pt]
    );
    Gt(
      function() {
        var w, T;
        if (!B) return;
        const p = E.current;
        if (!p) return;
        const h = (T = (w = l.dragHandleSelector) != null ? w : l.draggableSelector) != null ? T : `.${zt.DRAGGABLE}`, m = Array.from(
          p.querySelectorAll(h)
        ).filter((C) => Zt(C));
        for (const C of m)
          C.classList.add(zt.HANDLE);
        return () => {
          for (const C of m)
            C.classList.remove(zt.HANDLE);
        };
      },
      [
        l.dragHandleSelector,
        l.draggableSelector,
        B,
        Zt
      ]
    );
    const Qt = U(() => {
      const f = dt.current.nesting;
      return f ? f === !0 ? {} : f.enabled === !1 ? null : f : null;
    }, []), un = U(
      (f, p) => {
        var w;
        const h = Qt();
        if (!h || !document.elementsFromPoint) return null;
        const m = (w = h.droppableSelector) != null ? w : `.${zt.DROPPABLE}`;
        for (const T of document.elementsFromPoint(
          f.clientX,
          f.clientY
        )) {
          const C = Pt(T, m);
          if (!C) continue;
          if (!p.some(
            (A) => A === C || A.contains(C) || C.contains(A)
          )) return C;
        }
        return null;
      },
      [Pt, Qt]
    ), Fe = U(
      (f, p) => {
        var C, M, A, I;
        const h = (C = E.current) == null ? void 0 : C.getBoundingClientRect(), {
          k: m = 1,
          x: w = 0,
          y: T = 0
        } = (M = L.current.property("__zoom")) != null ? M : {};
        return {
          x: (f - ((A = h == null ? void 0 : h.left) != null ? A : 0) - w) / m,
          y: (p - ((I = h == null ? void 0 : h.top) != null ? I : 0) - T) / m
        };
      },
      []
    ), Tr = (f) => {
      var m;
      const p = (w) => w.match(
        /^\s*(-?(?:\d+|\d*\.\d+)px)(?:\s+(-?(?:\d+|\d*\.\d+)px))?/
      ), h = (m = p(f.style.translate)) != null ? m : p(getComputedStyle(f).translate);
      return {
        x: h ? Number.parseFloat(h[1]) : 0,
        y: h != null && h[2] ? Number.parseFloat(h[2]) : 0
      };
    }, Yt = U(
      (f, p) => {
        var w;
        const h = {
          x: p.clientX - f.startClientX,
          y: p.clientY - f.startClientY
        }, { k: m = 1 } = (w = L.current.property("__zoom")) != null ? w : {};
        return {
          sourceElement: f.sourceElement,
          draggedElements: f.draggedElements,
          dropTarget: f.dropTarget,
          position: Fe(p.clientX, p.clientY),
          delta: { x: h.x / m, y: h.y / m },
          screenDelta: h
        };
      },
      [Fe]
    ), ue = U(
      (f) => {
        var w, T, C, M;
        const p = v.current;
        if (!p) return;
        const h = Yt(p, f);
        for (const A of p.draggedElements) {
          const I = (w = p.startTranslations.get(A)) != null ? w : {
            x: 0,
            y: 0
          };
          A.style.translate = `${I.x + h.delta.x}px ${I.y + h.delta.y}px`;
        }
        const m = un(
          f,
          p.draggedElements
        );
        m !== p.dropTarget && ((T = p.dropTarget) == null || T.classList.remove(p.dropTargetClassName), m == null || m.classList.add(p.dropTargetClassName), p.dropTarget = m, h.dropTarget = m), (M = (C = dt.current).onDrag) == null || M.call(C, h);
      },
      [Yt, un]
    ), fn = U(
      (f, p) => {
        var m, w;
        if (f.isDragging) return;
        f.isDragging = !0;
        const h = dt.current.zIndex;
        if (f.shouldRestoreZIndex = h === void 0 || h === !1 ? h !== !1 : !1, h !== !1) {
          const T = 2147483647 - f.draggedElements.length;
          for (const [C, M] of f.draggedElements.entries()) {
            const A = typeof h == "function" ? h(M, C, f.draggedElements) : typeof h == "number" ? h + C : T + C;
            M.style.zIndex = String(A), M.classList.add(f.draggingClassName);
          }
        } else
          for (const T of f.draggedElements)
            T.classList.add(f.draggingClassName);
        (w = (m = dt.current).onDragStart) == null || w.call(m, Yt(f, p));
      },
      [Yt]
    ), Jt = U(
      (f) => {
        const p = v.current;
        if (p) {
          if (!p.isDragging) {
            const h = f.clientX - p.startClientX, m = f.clientY - p.startClientY;
            if (h * h + m * m < p.dragStartThreshold * p.dragStartThreshold)
              return;
            f.preventDefault(), fn(p, f);
          }
          p.latestEvent = f, p.animationFrame === null && (p.animationFrame = window.requestAnimationFrame(() => {
            const h = v.current;
            h != null && h.latestEvent && (h.animationFrame = null, ue(h.latestEvent));
          }));
        }
      },
      [ue, fn]
    ), fe = U(
      (f) => {
        var m, w, T, C, M, A;
        const p = v.current;
        if (!p) return;
        if (window.removeEventListener("mousemove", Jt), window.removeEventListener("mouseup", fe), !p.isDragging) {
          v.current = null;
          return;
        }
        p.animationFrame !== null && (window.cancelAnimationFrame(p.animationFrame), p.animationFrame = null), ue(f);
        const h = Yt(p, f);
        for (const I of p.draggedElements)
          I.classList.remove(p.draggingClassName), p.shouldRestoreZIndex && (I.style.zIndex = (m = p.startZIndexes.get(I)) != null ? m : "");
        (w = p.dropTarget) == null || w.classList.remove(p.dropTargetClassName), v.current = null, (C = (T = dt.current).onDragEnd) == null || C.call(T, h), h.dropTarget && ((A = (M = Qt()) == null ? void 0 : M.onDrop) == null || A.call(M, h));
      },
      [ue, Yt, Jt, Qt]
    );
    Gt(() => () => {
      const f = v.current, p = f == null ? void 0 : f.animationFrame;
      p != null && window.cancelAnimationFrame(p), window.removeEventListener("mousemove", Jt), window.removeEventListener("mouseup", fe);
    }, [fe, Jt]);
    const Cr = (f) => {
      var Et, St, pt, ot, wt, Lt, ge;
      const { dragEnabled: p, dragButton: h, previewMode: m } = rt.current;
      if (!p || m || f.button !== h) return;
      const w = f.target;
      if (ve({ target: w })) return;
      const T = Zt(w);
      if (!T) return;
      const C = dt.current, M = (Et = C.draggableSelector) != null ? Et : `.${zt.DRAGGABLE}`, A = (St = F.current) != null ? St : E.current, I = (ot = (pt = C.selectedClassName) != null ? pt : H.current.selectedClassName) != null ? ot : Ht.SELECTED, Z = A ? Array.from(A.querySelectorAll(M)) : [], Q = T.classList.contains(
        I
      ) ? Z.filter(
        (gt) => gt.classList.contains(I)
      ) : [T], Y = Q.filter(
        (gt) => !Q.some(
          (me) => me !== gt && me.contains(gt)
        )
      ), W = Qt(), tt = (wt = C.draggingClassName) != null ? wt : zt.DRAGGING, ft = (Lt = W == null ? void 0 : W.dropTargetClassName) != null ? Lt : zt.DROP_TARGET, Nt = {
        sourceElement: T,
        draggedElements: Y,
        startClientX: f.clientX,
        startClientY: f.clientY,
        dragStartThreshold: Math.max(0, (ge = C.dragStartThreshold) != null ? ge : 3),
        isDragging: !1,
        startTranslations: new Map(
          Y.map((gt) => [
            gt,
            Tr(gt)
          ])
        ),
        startZIndexes: new Map(
          Y.map((gt) => [gt, gt.style.zIndex])
        ),
        shouldRestoreZIndex: !1,
        dropTarget: null,
        draggingClassName: tt,
        dropTargetClassName: ft,
        animationFrame: null,
        latestEvent: null
      };
      v.current = Nt, window.addEventListener("mousemove", Jt), window.addEventListener("mouseup", fe);
    }, he = U(
      (f, p) => {
        var T;
        const {
          k: h = 1,
          x: m = 0,
          y: w = 0
        } = (T = L.current.property("__zoom")) != null ? T : {};
        return {
          screen: f,
          canvas: {
            x: (f.x - m) / h,
            y: (f.y - w) / h,
            width: f.width / h,
            height: f.height / h
          },
          selectedElements: p
        };
      },
      []
    ), de = U(
      (f, p) => {
        var W, tt, ft, Nt, Et;
        const h = g.current, m = b.current;
        if (!h || !m) return;
        const { wrapperBounds: w, startX: T, startY: C } = h, M = Xt({
          value: f.clientX - w.left,
          max: w.width
        }), A = Xt({
          value: f.clientY - w.top,
          max: w.height
        }), I = {
          x: Math.min(T, M),
          y: Math.min(C, A),
          width: Math.abs(M - T),
          height: Math.abs(A - C)
        };
        m.style.display = p ? "none" : "block", m.style.transform = `translate(${I.x}px, ${I.y}px)`, m.style.width = `${I.width}px`, m.style.height = `${I.height}px`;
        const Z = (W = H.current.selectedClassName) != null ? W : Ht.SELECTED, Q = [];
        for (const St of It()) {
          const pt = St.getBoundingClientRect(), ot = {
            x: pt.left - w.left,
            y: pt.top - w.top,
            width: pt.width,
            height: pt.height
          }, wt = ot.x < I.x + I.width && ot.x + ot.width > I.x && ot.y < I.y + I.height && ot.y + ot.height > I.y;
          St.classList.toggle(Z, wt), wt && Q.push(St);
        }
        const Y = he(I, Q);
        p ? (g.current = null, (ft = (tt = H.current).onSelectionEnd) == null || ft.call(tt, Y)) : (Et = (Nt = H.current).onSelectionChange) == null || Et.call(Nt, Y);
      },
      [he, It]
    ), Wt = U(
      (f) => de(f, !1),
      [de]
    ), pe = U(
      (f) => {
        window.removeEventListener("mousemove", Wt), window.removeEventListener("mouseup", pe), de(f, !0);
      },
      [Wt, de]
    );
    Gt(() => () => {
      window.removeEventListener("mousemove", Wt), window.removeEventListener("mouseup", pe);
    }, [Wt, pe]);
    const Nr = (f) => {
      if (!c) return;
      const p = f.target;
      Un({ target: p }) || c(
        f.nativeEvent,
        Fe(f.clientX, f.clientY)
      );
    }, Lr = (f, p) => {
      switch (p) {
        case "Alt":
          return f.altKey;
        case "Control":
          return f.ctrlKey;
        case "Meta":
          return f.metaKey;
        case "Shift":
          return f.shiftKey;
      }
    }, Mr = (f, p) => {
      var M, A, I, Z, Q, Y, W;
      const h = (M = H.current.selectedClassName) != null ? M : Ht.SELECTED, m = Lr(
        f,
        (A = H.current.multiSelectKey) != null ? A : "Shift"
      ), w = It();
      if (m)
        p.classList.toggle(h);
      else
        for (const tt of w)
          tt.classList.toggle(
            h,
            tt === p
          );
      const T = (I = E.current) == null ? void 0 : I.getBoundingClientRect(), C = w.filter(
        (tt) => tt.classList.contains(h)
      );
      (W = (Y = H.current).onSelectionEnd) == null || W.call(
        Y,
        he(
          {
            x: f.clientX - ((Z = T == null ? void 0 : T.left) != null ? Z : 0),
            y: f.clientY - ((Q = T == null ? void 0 : T.top) != null ? Q : 0),
            width: 0,
            height: 0
          },
          C
        )
      );
    }, Ar = (f) => {
      var Y, W, tt;
      const {
        selectionEnabled: p,
        selectionButton: h,
        dragEnabled: m,
        dragButton: w,
        previewMode: T
      } = rt.current;
      if (T || m && f.button === w && Zt(f.target) || !p || f.button !== h) return;
      const C = f.target;
      if (ve({ target: C })) return;
      const M = Oe(C);
      if (M) {
        Mr(f, M);
        return;
      }
      if (qt(C) || !E.current) return;
      f.preventDefault();
      const A = E.current.getBoundingClientRect(), I = f.clientX - A.left, Z = f.clientY - A.top;
      g.current = { startX: I, startY: Z, wrapperBounds: A };
      const Q = (Y = H.current.selectedClassName) != null ? Y : Ht.SELECTED;
      for (const ft of It())
        ft.classList.remove(Q);
      (tt = (W = H.current).onSelectionStart) == null || tt.call(
        W,
        he({ x: I, y: Z, width: 0, height: 0 }, [])
      ), window.addEventListener("mousemove", Wt), window.addEventListener("mouseup", pe);
    }, Rr = (f) => {
      const { panButton: p, selectionEnabled: h, selectionButton: m, previewMode: w } = rt.current;
      if (w || !(p === Dt.RIGHT || h && m === Dt.RIGHT)) return;
      const C = f.target;
      ve({ target: C }) || f.preventDefault();
    };
    let Xe = "";
    return u ? Xe = bt.previewMode : (q !== Dt.LEFT || P && O === Dt.LEFT) && (Xe = bt.selectionMode), /* @__PURE__ */ Ce("div", { className: bt.container, children: [
      /* @__PURE__ */ Ce(
        "div",
        {
          ref: E,
          className: `${bt.canvasWrapper} ${Xe} ${e}`,
          onMouseDownCapture: Cr,
          onMouseDown: Ar,
          onDoubleClick: Nr,
          onContextMenu: Rr,
          children: [
            ze ? /* @__PURE__ */ V("div", { ref: x, className: bt.canvas, children: /* @__PURE__ */ V("div", { ref: X, children: /* @__PURE__ */ V("div", { className: bt.contentWrapper, children: t }) }) }) : /* @__PURE__ */ V(
              "svg",
              {
                ref: x,
                className: bt.canvas,
                "aria-label": "Infinite canvas",
                role: "application",
                children: /* @__PURE__ */ V("g", { ref: X, children: /* @__PURE__ */ V(
                  "foreignObject",
                  {
                    x: nt.INITIAL_POSITION_X,
                    y: nt.INITIAL_POSITION_Y,
                    width: nt.DEFAULT_LAYOUT,
                    height: nt.DEFAULT_LAYOUT,
                    style: { overflow: "visible" },
                    children: t
                  }
                ) })
              }
            ),
            P && /* @__PURE__ */ V(
              "div",
              {
                ref: b,
                className: `${bt.selectionBox} ${(_n = s.selectionBoxClassName) != null ? _n : ""}`
              }
            )
          ]
        }
      ),
      S.disable ? null : /* @__PURE__ */ V(
        ys,
        {
          maxZoom: i,
          zoomTransform: R,
          ...S
        }
      ),
      y.renderScrollBar && !u && E.current && /* @__PURE__ */ V(
        Ms,
        {
          ref: K,
          scale: R.scale,
          ...y,
          verticalOffsetHeight: E.current.offsetHeight,
          horizontalOffsetWidth: E.current.offsetWidth,
          getContainerOffset: yt,
          onScrollDeltaHandler: z
        }
      ),
      !u && _.map((f) => {
        const {
          component: p,
          position: h = De.BOTTOM_LEFT,
          offset: m = { x: 0, y: 0 },
          overlap: w = !0,
          className: T = ""
        } = f, C = `${h}-${m.x}-${m.y}-${w}`;
        return /* @__PURE__ */ V(
          Rs,
          {
            component: p,
            position: h,
            offset: m,
            overlap: w,
            zoomState: { ...R, minZoom: r, maxZoom: i },
            className: T
          },
          C
        );
      })
    ] });
  }
), Rs = ({
  component: t,
  position: e,
  offset: n,
  overlap: r,
  zoomState: i,
  className: a
}) => {
  const o = Wn(() => {
    const l = Object.values(De).includes(e) ? e : De.BOTTOM_LEFT, [u, c] = l.split("-");
    return {
      [c]: n.x,
      [u]: n.y
    };
  }, [e, n]), s = qn.cloneElement(t, {
    zoomState: i
  });
  return /* @__PURE__ */ V(
    "div",
    {
      style: {
        position: "absolute",
        ...o,
        zIndex: r ? 20 : 1
      },
      className: a,
      children: s
    }
  );
}, $s = ({
  children: t,
  shouldBlockScroll: e = !0,
  shouldBlockZoom: n = !0,
  shouldBlockPan: r = !0,
  shouldBlockDoubleClick: i = !0
}) => {
  const a = ps(
    e,
    n,
    r,
    i
  );
  return /* @__PURE__ */ V("div", { className: `${a}`, children: t });
};
export {
  ys as Background,
  De as COMPONENT_POSITIONS,
  zt as DRAG_CLASSES,
  $s as EventBlocker,
  Dt as MOUSE_BUTTONS,
  zs as ReactInfiniteCanvas,
  mt as SCROLL_NODE_POSITIONS,
  Ht as SELECTION_CLASSES
};
