class dust {
    constructor() {
        this.x = 50;
        this.y = 50;
        this.vx = Math.random() * 2 + 2;
        this.vy = Math.random() * 2;
        this.color = '#fff';
        this.shadowBlur = Math.random() * 3;
        this.shadowX = (Math.random() * 2) - 1;
        this.shadowY = (Math.random() * 2) - 1;
        this.radiusX = Math.random() * 3;
        this.radiusY = Math.random() * 3;
        this.rotation = Math.PI * Math.floor(Math.random() * 2);
    }
}
class canvasDust {
    constructor(canvasID) {
        this.width = 300;
        this.height = 300;
        this.dustQuantity = 50;
        this.dustArr = [];
        const canvas = document.getElementById(canvasID);
        if (canvas) {
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            this.build();
            window.addEventListener('resize', () => this.resize());
        }
        else {
            throw new Error('canvasID 无效');
        }
    }
    build() {
        this.resize();
        if (this.ctx) {
            const point = canvasDust.getPoint(this.dustQuantity);
            for (let i of point) {
                const dustObj = new dust();
                this.buildDust(i[0], i[1], dustObj);
                this.dustArr.push(dustObj);
            }
            setInterval(() => {
                this.play();
            }, 40);
        }
    }
    play() {
        var _a;
        const dustArr = this.dustArr;
        (_a = this.ctx) === null || _a === void 0 ? void 0 : _a.clearRect(0, 0, this.width, this.height);
        for (let i of dustArr) {
            if (i.x < 0 || i.y < 0) {
                const x = this.width;
                const y = Math.floor(Math.random() * window.innerHeight);
                i.x = x;
                i.y = y;
                this.buildDust(x, y, i);
            }
            else {
                const x = i.x - i.vx;
                const y = i.y - i.vy;
                this.buildDust(x, y, i);
            }
        }
    }
    buildDust(x, y, dust) {
        const ctx = this.ctx;
        if (x)
            dust.x = x;
        if (y)
            dust.y = y;
        if (ctx) {
            ctx.beginPath();
            ctx.shadowBlur = dust.shadowBlur;
            ctx.shadowColor = dust.color;
            ctx.shadowOffsetX = dust.shadowX;
            ctx.shadowOffsetY = dust.shadowY;
            ctx.ellipse(dust.x, dust.y, dust.radiusX, dust.radiusY, dust.rotation, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fillStyle = dust.color;
            ctx.fill();
        }
    }
    resize() {
        const canvas = this.canvas;
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.width = width;
        this.height = height;
        this.dustQuantity = Math.floor((width + height) / 38);
        if (canvas !== undefined) {
            canvas.width = width;
            canvas.height = height;
        }
    }
    static getPoint(number = 1) {
        let point = [];
        for (let i = 0; i < number; i++) {
            const x = Math.floor(Math.random() * window.innerWidth);
            const y = Math.floor(Math.random() * window.innerHeight);
            point.push([x, y]);
        }
        return point;
    }
}
class index {
    constructor() {
        this.index = [];
        this.headerLink = document.getElementsByClassName("headerlink");
        this.tocLink = document.getElementsByClassName("toc-link");
        this.postContent = document.getElementById("post-content");
        this.article = document.getElementsByTagName("article")[0];
        if (this.article) {
            this.article.addEventListener("scroll", () => {
                for (let i = 0; i < this.headerLink.length; i++) {
                    const link = this.headerLink.item(i);
                    if (link) {
                        this.index.push(link.getBoundingClientRect().top);
                    }
                }
                for (let i in this.index) {
                    const item = this.tocLink.item(Number(i));
                    item.classList.remove('active');
                }
                for (let i in this.index) {
                    const item = this.tocLink.item(Number(i));
                    if (this.index[i] > 0) {
                        item.classList.add('active');
                        break;
                    }
                }
                this.index = [];
            });
        }
    }
}
new canvasDust('canvas-dust');
new index();
