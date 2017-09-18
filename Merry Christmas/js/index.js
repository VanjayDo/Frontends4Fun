// Snow from http://codepen.io/radum/pen/xICAB

(function () {

    var COUNT = 300;
    var masthead = document.querySelector('.sky');
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var width = masthead.clientWidth;
    var height = masthead.clientHeight;
    var i = 0;
    var active = false;

    function onResize() {
        width = masthead.clientWidth;
        height = masthead.clientHeight;
        canvas.width = width;
        canvas.height = height;
        ctx.fillStyle = '#FFF';

        var wasActive = active;
        active = width > 600;

        if (!wasActive && active)
            requestAnimFrame(update);
    }

    var Snowflake = function () {
        this.x = 0;
        this.y = 0;
        this.vy = 0;
        this.vx = 0;
        this.r = 0;

        this.reset();
    }

    Snowflake.prototype.reset = function () {
        this.x = Math.random() * width;
        this.y = Math.random() * -height;
        this.vy = 1 + Math.random() * 3;
        this.vx = 0.5 - Math.random();
        this.r = 1 + Math.random() * 2;
        this.o = 0.5 + Math.random() * 0.5;
    }

    canvas.style.position = 'absolute';
    canvas.style.left = canvas.style.top = '0';

    var snowflakes = [], snowflake;
    for (i = 0; i < COUNT; i++) {
        snowflake = new Snowflake();
        snowflake.reset();
        snowflakes.push(snowflake);
    }

    function update() {

        ctx.clearRect(0, 0, width, height);

        if (!active)
            return;

        for (i = 0; i < COUNT; i++) {
            snowflake = snowflakes[i];
            snowflake.y += snowflake.vy;
            snowflake.x += snowflake.vx;

            ctx.globalAlpha = snowflake.o;
            ctx.beginPath();
            ctx.arc(snowflake.x, snowflake.y, snowflake.r, 0, Math.PI * 2, false);
            ctx.closePath();
            ctx.fill();

            if (snowflake.y > height) {
                snowflake.reset();
            }
        }

        requestAnimFrame(update);
    }

    // shim layer with setTimeout fallback
    window.requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    onResize();
    window.addEventListener('resize', onResize, false);

    masthead.appendChild(canvas);
})();


window.onload = function () {

    window.requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    function animloop() {
        SYSTEM.totalUpdate();
        requestAnimFrame(animloop);
    }

    animloop();

};

SYSTEM = function () {
    var cnv = document.getElementById('canvas');
    var ctx = cnv.getContext('2d');

    var Parent = function (childQuant, radius, xPos, yPos) {
        this.radius = radius;
        this.xPos = xPos;
        this.yPos = yPos;
        this.children = [];
        this.minDist = 40;
        this.isActive = false;
        this.shapeCoords = [

            //words under the tree
            //you can modify them according to the coordinates
            [-125, 105], [-115, 105],
            [-125, 115], [-105, 115], [-95, 115], [-85, 115], [-65, 115], [-45, 115], [-5, 115], [15, 115], [35, 115], [55, 115], [65, 115], [75, 115], [105, 115], [115, 115], [125, 115],
            [-135, 125], [-125, 125], [-115, 125], [-105, 125], [-85, 125], [-65, 125], [-55, 125], [-45, 125], [-5, 125], [15, 125], [35, 125], [55, 125], [75, 125], [105, 125], [125, 125],
            [-125, 135], [-105, 135], [-85, 135], [-5, 135], [-65, 135], [5, 135], [15, 135], [25, 135], [55, 135], [75, 135], [105, 135], [125, 135],
            [-125, 145], [-105, 145], [-95, 145], [-85, 145], [-65, 145], [5, 145], [25, 145], [55, 145], [65, 145], [75, 145], [85, 145], [105, 145], [125, 145],
            [-125, 155],
            [-135, 165], [-125, 165],

            //tree
            [0, -150],
            [-25, -125], [0, -125], [25, -125],
            [-50, -100], [-25, -100], [0, -100], [25, -100], [50, -100],
            [-50, -75, [-50, -100]], [-25, -75], [0, -75], [25, -75], [50, -75, [50, -100]],
            [-75, -50], [-50, -50], [-25, -50], [0, -50], [25, -50], [50, -50], [75, -50],
            [-75, -25, [-75, -50]], [-50, -25], [-25, -25], [0, -25], [25, -25], [50, -25], [75, -25, [75, -50]],
            [-100, 0], [-75, 0], [-50, 0], [-25, 0], [0, 0], [25, 0], [50, 0], [75, 0], [100, 0],
            [-100, 25, [-100, 0]], [-75, 25], [-50, 25], [-25, 25], [0, 25], [25, 25], [50, 25], [75, 25], [100, 25, [100, 0]],
            [-125, 50], [-100, 50], [-75, 50], [-50, 50], [-25, 50], [0, 50], [25, 50], [50, 50], [75, 50], [100, 50], [125, 50],
            [0, 75, [[-25, 105], [-15, 105], [25, 105]]]

        ];


        this.born = function () {
            var maxVelocity = 2.5,
                angle,
                velocity,
                velAngle,
                distFromCenter,
                xPos,
                yPos;

            for (var i = childQuant; i > 0; i -= 1) {
                angle = Math.random() * 2 * Math.PI;
                velocity = maxVelocity * (0.3 + 0.7 * Math.random());
                velAngle = Math.random() * 2 * Math.PI;
                distFromCenter = Math.random() * this.radius;

                xPos = (distFromCenter - Child.prototype.RADIUS) * Math.cos(angle);
                yPos = (distFromCenter - Child.prototype.RADIUS) * Math.sin(angle);
                velX = velocity * Math.cos(velAngle);
                velY = velocity * Math.sin(velAngle);

                this.children.push(new Child(xPos, yPos, velX, velY));
            }
        };

        this.drawChildren = function () {
            var color,
                shapes = ParentParticle.shapeCoords.length - 1;

            for (var i = this.children.length - 1; i >= 0; i -= 1) {
                if (i === shapes) {
                    color = ParentParticle.isActive ? 'brown' : 'rgb(190,190,190)';
                } else if (i < shapes && i > shapes - 21) {
                    color = ParentParticle.isActive ? '#304c02' : 'rgb(190,190,190)';
                } else if (i < shapes - 20 && i > shapes - 37) {
                    color = ParentParticle.isActive ? '#547b01' : 'rgb(190,190,190)';
                } else if (i < shapes - 36 && i > shapes - 49) {
                    color = ParentParticle.isActive ? '#90a900' : 'rgb(190,190,190)';
                } else if (i < shapes - 48 && i > shapes - 58) {
                    color = ParentParticle.isActive ? '#b9c21d' : 'rgb(190,190,190)';
                } else if (i < shapes - 57) {
                    color = ParentParticle.isActive ? 'brown' : 'rgb(190,190,190)';
                    this.children[i].noCon = true;
                    this.children[i].RADIUS = 2;

                } else {
                    color = false;
                }
                this.draw(this.children[i].xPos + this.xPos, this.children[i].yPos + this.yPos, this.children[i].RADIUS,
                    ParentParticle.isActive ? (color ? color : 'rgba(190, 190, 190, 0.1)') : 'rgba(190, 190, 190, 0.8)');

                for (var j = i - 1; j >= 0; j -= 1) {

                    if (!this.children[i].noCon) {
                        this.drawDistance(this.children[i].xPos, this.children[i].yPos,
                            this.children[j].xPos, this.children[j].yPos, color);

                    } else if (typeof this.children[i].noCon === 'boolean') {
                        this.drawDistance(this.children[i].xPos, this.children[i].yPos,
                            this.children[j].xPos, this.children[j].yPos, false, 1);

                    } else if (!(Math.round(this.children[j].xPos) === this.children[i].noCon[0] &&
                            Math.round(this.children[j].yPos) === this.children[i].noCon[1])) {
                        this.drawDistance(this.children[i].xPos, this.children[i].yPos,
                            this.children[j].xPos, this.children[j].yPos, color);
                    }
                }

            }
        };

        this.draw = function (x, y, rad, color) {
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(x, y, rad, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.closePath();
        };

        this.drawDistance = function (x1, y1, x2, y2, color, minDist) {
            var dist,
                minimDist = minDist ? minDist : this.minDist,
                dx = x1 - x2,
                dy = y1 - y2;

            dist = Math.sqrt(dx * dx + dy * dy);

            if (dist <= minimDist) {
                //draw the line

                ctx.beginPath();
                // ctx.strokeStyle = "rgba(111, 112, 39,"+ (1.2-dist / this.minDist) +")";
                if (ParentParticle.isActive && color) {
                    ctx.strokeStyle = color;
                } else {
                    ctx.strokeStyle = "rgba(100, 100, 100," + (1.2 - dist / this.minDist) + ")";
                }
                ctx.moveTo(x1 + this.xPos, y1 + this.yPos);
                ctx.lineTo(x2 + this.xPos, y2 + this.yPos);
                ctx.stroke();
                ctx.closePath();
            }

        };

        this.updateChildren = function () {
            var currChild,
                lastXPos,
                lastYPos,
                exitX,
                exitY,
                radSquare,
                parentRadSquare = this.radius * this.radius,
                twiceProjFactor,

                sound = document.getElementById('soundHandle'),
                colPointAngle,
                velStats;

            for (var i = this.children.length - 1; i >= 0; i -= 1) {
                currChild = this.children[i];

                radSquare = currChild.xPos * currChild.xPos + currChild.yPos * currChild.yPos;

                if (ParentParticle.isActive && currChild.targetPos) {
                    velStats = getVelocity({x: currChild.xPos, y: currChild.yPos}, currChild.targetPos);
                    currChild.velX = velStats._velX;
                    currChild.velY = velStats._velY;
                } else if (currChild.velX === 0 && currChild.velY === 0) {
                    currChild.velX = Math.random() * 3;
                    currChild.velY = Math.random() * 3;
                    currChild.velX = Math.round(currChild.velX, 2) % 2 === 0 ? currChild.velX : -currChild.velX;
                }

                lastXPos = currChild.xPos;
                lastYPos = currChild.yPos;


                if (radSquare > parentRadSquare) {
                    exitX = (lastXPos + currChild.xPos) / 2;
                    exitY = (lastYPos + currChild.yPos) / 2;

                    exitRad = Math.sqrt(exitX * exitX + exitY * exitY);
                    exitX *= this.radius / exitRad;
                    exitY *= this.radius / exitRad;

                    currChild.xPos = exitX;
                    currChild.yPos = exitY;

                    twiceProjFactor = 2 * (exitX * currChild.velX + exitY * currChild.velY) / parentRadSquare;
                    currChild.velX -= twiceProjFactor * exitX;
                    currChild.velY -= twiceProjFactor * exitY;
                }

                currChild.xPos += currChild.velX;
                currChild.yPos += currChild.velY;
            }

        };
    };


    function getVelocity(currCoord, targCoord) {
        var xDist = (Math.max(currCoord.x, targCoord.x) + 200) - (Math.min(currCoord.x, targCoord.x) + 200);
        var yDist = (Math.max(currCoord.y, targCoord.y) + 200) - (Math.min(currCoord.y, targCoord.y) + 200);
        if (currCoord.x > targCoord.x) {
            xDist = -xDist;
        }
        if (currCoord.y > targCoord.y) {
            yDist = -yDist;
        }

        if (Math.sqrt(xDist * xDist + yDist * yDist) > 0.1) {
            return {
                _velX: xDist / 15,
                _velY: yDist / 15
            };
        } else {
            return {
                _velX: 0,
                _velY: 0
            };
        }
    }

    var Child = function (xPos, yPos, velX, velY) {
        this.xPos = Math.round(xPos);
        this.yPos = Math.round(yPos);
        this.velX = velX;
        this.velY = velY;


    };

    Child.prototype = {
        RADIUS: 3
    };

    var ParentParticle = new Parent(120, 200, cnv.width / 2, cnv.height / 2);
    ParentParticle.born();


    var calculateMousePos = function (evt) {
        var rect = cnv.getBoundingClientRect();
        var root = document.documentElement;
        var mouseX = evt.clientX - rect.left - root.scrollLeft;
        var mouseY = evt.clientY - rect.top - root.scrollTop;

        return {
            x: mouseX,
            y: mouseY
        };

    };

    cnv.addEventListener('mousemove',
        function (evt) {
            var mousePos = calculateMousePos(evt);
            var x0, y0, mouseToCenterDist;
            var list = ParentParticle.children.length;
            var coordList = ParentParticle.shapeCoords.length;

            x0 = ParentParticle.xPos - mousePos.x;
            y0 = ParentParticle.yPos - mousePos.y;

            mouseToCenterDist = Math.sqrt(x0 * x0 + y0 * y0);

            if (mouseToCenterDist < ParentParticle.radius && !ParentParticle.isActive) {

                ParentParticle.isActive = true;

                for (var i = 0; i < coordList; i++) {
                    if (typeof ParentParticle.shapeCoords[i][ParentParticle.shapeCoords[i].length - 1] === 'object') {
                        ParentParticle.children[i].noCon = ParentParticle.shapeCoords[i][ParentParticle.shapeCoords[i].length - 1];
                    }
                    if (i < 59) {
                        ParentParticle.children[i].targetPos = {
                            x: ParentParticle.shapeCoords[i][0] / 1.8,
                            y: ParentParticle.shapeCoords[i][1] / 1.8 + 60
                        };
                    } else {
                        ParentParticle.children[i].targetPos = {
                            x: ParentParticle.shapeCoords[i][0],
                            y: ParentParticle.shapeCoords[i][1]
                        };
                    }
                }
            } else if (mouseToCenterDist > ParentParticle.radius && ParentParticle.isActive) {
                ParentParticle.isActive = false;
                for (var j = list - 1; j >= 0; j -= 1) {
                    ParentParticle.children[j].targetPos = undefined;
                }
            }
        }
    );

    var totalUpdate = function () {
        ctx.clearRect(0, 0, cnv.width, cnv.height);
        ParentParticle.draw(ParentParticle.xPos, ParentParticle.yPos, ParentParticle.radius + ParentParticle.children[0].RADIUS, '#CB7064');

        ParentParticle.updateChildren();
        ParentParticle.drawChildren();
    };

    return {
        totalUpdate: totalUpdate
    };

}();