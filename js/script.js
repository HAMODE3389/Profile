(function() {
  var doodleSVG = function() {}
  doodleSVG.prototype.normalizeArray = function(x1, y1, x2, y2) {
    var a = x1 - x2
    var b = y1 - y2
    return Math.sqrt(a * a + b * b)
  }

  doodleSVG.prototype.normalize = function(el) {
    if (!el) return 0
    var pathLength
    var points
    var normPoints
    var i
    var j
    var k
    var l
    var check = el.tagName.toLowerCase()

    if (check === 'path') {
      i = el.style.strokeDasharray
      el.style.strokeDasharray = 'none'
      pathLength = el.getTotalLength() || 0
      el.style.strokeDasharray = i
    } else if (check === 'rect') {
      pathLength = 2 * el.getAttribute('width') + 2 * el.getAttribute('height')
    } else if (check === 'circle') {
      pathLength = 2 * Math.PI * parseFloat(el.getAttribute('r'))
    } else if (check === 'line') {
      pathLength = this.normalizeArray(el.getAttribute('x1'), el.getAttribute('y1'), el.getAttribute('x2'), el.getAttribute('y2'))
    } else if (check === 'polyline' || check === 'polygon') {
      for (
        points = el
          .getAttribute('points')
          .split(', ')
          .join(',')
          .split(' '),
          pathLength = 0,
          i = points[0].split(','),
          points[points.length - 1] === '' && points.pop(),
          check === 'polygon' &&
            (points.push(points[0]),
            points[0].indexOf(',') === -1 && points.push(points[1])),
          j = 1;
        j < points.length;
        j++
      ) {
        normPoints = points[j].split(',')
        normPoints.length === 1 && (normPoints[1] = points[j++])
        normPoints.length === 2 &&
          ((pathLength +=
            this.normalizeArray(i[0], i[1], normPoints[0], normPoints[1]) || 0),
          (i = normPoints))
      }
    } else {
      check === 'ellipse' &&
        ((k = parseFloat(el.getAttribute('rx'))),
        (l = parseFloat(el.getAttribute('ry'))),
        (pathLength =
          Math.PI * (3 * (k + l) - Math.sqrt((3 * k + l) * (k + 3 * l)))))
    }

    return new doodleSVG.PathNormalized(el, pathLength)
  }
  doodleSVG.prototype.normalizeGroup = function(domList) {
    if (!domList) return 0
    else if (typeof domList !== 'object') return 0

    var normalizedArray = []
    ;[].forEach.call(domList, function(item, key) {
      var attemptNormalize = this.normalize(item)
      if (item) {
        normalizedArray.push(attemptNormalize)
      }
    }.bind(this))
    return normalizedArray.length > 0 ? normalizedArray : 0
  }

  doodleSVG.PathNormalized = function(el, pathLength) {
    this.dom = el
    this.pathLength = pathLength
    this.end = 0
    this.origin = 0
    this.path = this.pathLength + 'px, ' + this.pathLength + 'px'
    this.dom.style.strokeDasharray = this.path
    this.dom.style.strokeDashoffset = '0px'
  }

  doodleSVG.PathNormalized.prototype.drawOrigin = function(origin) {
    this.dom.style.strokeDashoffset = -(origin * this.pathLength) + 'px'
  }
  doodleSVG.PathNormalized.prototype.drawEnd = function(end) {
    var dWidth = this.pathLength * end - this.origin * this.pathLength
    var d = dWidth + 'px, ' + this.pathLength + 'px'
    this.dom.style.strokeOpacity = dWidth < 1e-9 ? 0 : 1
    this.dom.style.strokeDasharray = d
    this.path = d
  }

  Object.defineProperty(doodleSVG.PathNormalized.prototype, 'origin', {
    set: function(newVal) {
      this._origin = newVal
      requestAnimationFrame(function() {
        this.drawOrigin(newVal)
      }.bind(this))
    },
    get: function() {
      return this._origin
    }
  })
  Object.defineProperty(doodleSVG.PathNormalized.prototype, 'end', {
    set: function(newVal) {
      this._end = newVal
      requestAnimationFrame(function() {
        this.drawEnd(newVal)
      }.bind(this))
    },
    get: function() {
      return this._end
    }
  })
  
    var doodle = new doodleSVG()

    var list = document.querySelectorAll("path, line")
    
    TweenMax.set(list,{"fill-opacity": 0, opacity: 0, force3D: true});
    var myDoodles = doodle.normalizeGroup(list)
  var tl = new TimelineMax({ repeat:-1, yoyo: true,
                     repeatDelay: .5})
    tl
      .staggerTo(list, .3, {"fill-opacity": 1,
              
			    		onStart: function()
			    		{
			    			TweenMax.set(this.target,{opacity: 1});
			    		},
			    		onReverseComplete: function()
			    		{
								TweenMax.set(this.target,{opacity: 0});
			    		}
			    	}, .15, 'b')
      .staggerTo(myDoodles, 1.25, {end: 1, ease:Quint.easeInOut},.15, 'b')
})()
