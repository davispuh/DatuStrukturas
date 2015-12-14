
var Strukturas = [
    {
        id: "vienkars_saraksts",
        nosaukums: "Vienkāršsaistīts saraksts",
        izveidot: null,
        varKartot: true
    },
    {
        id: "divkars_saraksts",
        nosaukums: "Divkāršsaistīts saraksts",
        izveidot: null,
        varKartot: true
    },
    {
        id: "steks",
        nosaukums: "Steks",
        izveidot: null,
        varKartot: false
    },
    {
        id: "rinda",
        nosaukums: "Rinda",
        izveidot: null,
        varKartot: false
    },
    {
        id: "kaudze",
        nosaukums: "Kaudze",
        izveidot: null,
        varKartot: false
    },
    {
        id: "binars_koks",
        nosaukums: "Binārs koks",
        izveidot: null,
        varKartot: false
    },
    {
        id: "avl_koks",
        nosaukums: "AVL koks",
        izveidot: null,
        varKartot: false
    },
    {
        id: "meklesanas_koks",
        nosaukums: "Meklēšanas koks",
        izveidot: null,
        varKartot: true
    }
];

var c = 0;

function dabutVertibu() {
    return Math.round(Math.random() * 99);
}

function dabutAtslegas() {
    return "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('').reverse();
}

var ramjaKrasa  = '#008CBA';
var aktivaKrasa = '#EC5840';
var iezimetaKrasa = '#FFAE00';

// Vienkāršsaistīts saraksts
Strukturas[c++].izveidot = function(elementi) {
    this.struktura = null;
    this.aktivsElements = null;
    this.atslegas = dabutAtslegas();
    var objekts = this;
    this.elements = function(vertiba) {
        this.vertiba = vertiba;
        this.atslega = objekts.atslegas.pop();
        this.zimejums = [];
        this.nakosais = null;
    };
    this.katramElementam = function(fn) {
        var elem = objekts.struktura;
        if (!elem) {
            return;
        }
        fn(elem);
        while (elem.nakosais) {
            elem = elem.nakosais;
            fn(elem);
        }
    };
    this.elementuSkaits = function() {
        var i = 0;
        objekts.katramElementam(function(elem) {
            i++;
        });
        return i;
    };
    this.pievienot = function(vertiba, pozicija, attels) {
        if ((pozicija === 2 || pozicija === 3) && !this.aktivsElements) {
            return 0;
        }
        var jauns = new objekts.elements(vertiba);
        var i;
        var gaidit = 1300;
        var fnIezimet = function(t, e, iep) {
            setTimeout(function(){
                e.zimejums[0].setStroke(iezimetaKrasa);
                if (iep) {
                    iep.zimejums[0].setStroke(ramjaKrasa);
                }
                attels.renderAll();
            }, t);
        };
        if (objekts.struktura) {
            var elem;
            var obj;
            var platums;
            var augstums;
            var skaits = 1;
            var esk;
            if (pozicija === 3 && this.aktivsElements === objekts.struktura) {
                pozicija = 1;
            }
            if (attels) {
                if (objekts.struktura.zimejums.length > 0) {
                    platums = objekts.struktura.zimejums[0].width;
                    augstums = objekts.struktura.zimejums[0].height;
                }
                if (pozicija === 2) {
                    elem = objekts.struktura;
                    while (elem !== this.aktivsElements && elem) {
                        skaits++;
                        elem = elem.nakosais;
                    }
                }
                for (i = 0; i < objekts.struktura.zimejums.length; i++) {
                    obj = window.fabric.util.object.clone(objekts.struktura.zimejums[i]);
                    if (i === 0) {
                        obj.setStroke(ramjaKrasa);
                    } else if (i === 1) {
                        obj.setText(jauns.vertiba.toString());
                    } else if (i === 2) {
                        obj.setText(jauns.atslega.toString());
                    }
                    if (pozicija === 2) {
                        obj.left += skaits * (platums + 20);
                        if (i >= 3) {
                            obj.set({x1: obj.x1 + skaits * (platums + 20), x2: obj.x2 + skaits * (platums + 20)});
                        }
                    }
                    if (i < 3) {
                        obj.top -= augstums + augstums / 4;
                        attels.add(obj);
                    }
                    if (i === 0) {
                        attels.sendToBack(obj);
                    }
                    jauns.zimejums.push(obj);
                }
            }
            if (pozicija === 1) {
                elem = objekts.struktura;
                objekts.struktura = jauns;
                objekts.struktura.nakosais = elem;
                do {
                    for (i = 0; i < elem.zimejums.length; i++) {
                        elem.zimejums[i].animate('left', '+=' + (platums + 20).toString(), { onChange: attels.renderAll.bind(attels), easing: window.fabric.util.ease.easeInQuad });
                    }
                    elem = elem.nakosais;
                } while (elem);
                elem = objekts.struktura;
                obj = elem;
            } else if (pozicija === 2 || pozicija === 3) {
                if (pozicija === 2) {
                    elem = objekts.aktivsElements.nakosais;
                    objekts.aktivsElements.nakosais = jauns;
                    obj = elem;
                    elem = jauns;
                    gaidit += 500;
                } else {
                    elem = objekts.struktura;
                    obj = null;
                    esk = this.elementuSkaits();
                    fnIezimet(skaits * (500 / esk), elem, obj);
                    while (elem.nakosais !== objekts.aktivsElements && elem.nakosais) {
                        skaits++;
                        if (attels) {
                            fnIezimet(skaits * (500 / esk), elem, obj);
                        }
                        obj = elem;
                        elem = elem.nakosais;
                    }
                    fnIezimet((skaits + 1) * (500 / esk), elem, obj);
                    elem.nakosais = jauns;
                    obj = objekts.aktivsElements;
                }
                jauns.nakosais = obj;
                while (obj) {
                    for (i = 0; i < obj.zimejums.length; i++) {
                        obj.zimejums[i].animate('left', '+=' + (platums + 20).toString(), { onChange: attels.renderAll.bind(attels), easing: window.fabric.util.ease.easeInQuad });
                    }
                    obj = obj.nakosais;
                }
                obj = jauns;
            } else {
                esk = this.elementuSkaits();
                elem = objekts.struktura;
                obj = null;
                while (elem.nakosais) {
                   if (attels) {
                       fnIezimet(skaits * (500 / esk), elem, obj);
                   }
                   obj = elem;
                   elem = elem.nakosais;
                   skaits++;
                }
                if (attels) {
                    fnIezimet(skaits * (500 / esk), elem, obj);
                }
                elem.nakosais = jauns;
                obj = jauns;
            }
            if (attels) {
                if (pozicija === 1 || pozicija === 2 || pozicija === 3) {
                    if (!jauns.nakosais) {
                        elem = objekts.aktivsElements;
                    }
                    if (pozicija === 3) {
                        esk = elem;
                        elem = jauns;
                        for (i = 3; i <= 5; i++) {
                             elem.zimejums[i].set({x1: elem.zimejums[i].x1 + (platums + 20) * skaits, x2: elem.zimejums[i].x2 + (platums + 20) * skaits});
                        }
                    }
                    (function(e) {
                        setTimeout(function(){
                            e.zimejums[3].set({x2: e.zimejums[3].x2 - 30});
                            e.zimejums[4].set({x1: e.zimejums[4].x1 - 30, x2: e.zimejums[4].x2 - 30});
                            e.zimejums[5].set({x1: e.zimejums[5].x1 - 30, x2: e.zimejums[5].x2 - 30});
                            attels.add(e.zimejums[3]);
                            attels.add(e.zimejums[4]);
                            attels.add(e.zimejums[5]);
                        }, (pozicija === 2 || pozicija === 3) ? 1300 : 750);
                    }(elem));
                    if (pozicija === 3) {
                        elem = esk;
                    }
                }
                if (pozicija === 0 || pozicija === 3) {
                    for (i = 0; i < 3; i++) {
                        jauns.zimejums[i].animate('left', '+=' + ((platums + 20) * skaits).toString(), { onChange: attels.renderAll.bind(attels), easing: window.fabric.util.ease.easeInQuad });
                    }
                    var rad = window.fabric.util.degreesToRadians(-40);
                    var ls;
                    var le;
                    elem.zimejums[3].x1 = objekts.struktura.zimejums[3].x1;
                    elem.zimejums[3].x2 = objekts.struktura.zimejums[3].x2;
                    var centrs = new window.fabric.Point(elem.zimejums[3].x1, elem.zimejums[3].y1);
                    var fn = function(x) {
                        setTimeout(function(){
                            var c = new window.fabric.Point(centrs.x + (skaits - 1) * (platums + 20), centrs.y);
                            elem.zimejums[x].x1 += (skaits - 1) * (platums + 20);
                            elem.zimejums[x].x2 += (skaits - 1) * (platums + 20);
                            var rad = window.fabric.util.degreesToRadians(40);
                            var ls = window.fabric.util.rotatePoint(new window.fabric.Point(elem.zimejums[x].x1, elem.zimejums[x].y1), c, rad);
                            var le = window.fabric.util.rotatePoint(new window.fabric.Point(elem.zimejums[x].x2, elem.zimejums[x].y2), c, rad);
                            var fn = { onChange: attels.renderAll.bind(attels), easing: window.fabric.util.ease.easeInQuad };
                            elem.zimejums[x].animate('x1', ls.x, fn);
                            elem.zimejums[x].animate('y1', ls.y, fn);
                            elem.zimejums[x].animate('x2', le.x, fn);
                            elem.zimejums[x].animate('y2', le.y, fn);
                        }, 700);
                    };
                    for (i = 3; i <= 5; i++) {
                        elem.zimejums[i].x1 = objekts.struktura.zimejums[i].x1;
                        elem.zimejums[i].x2 = objekts.struktura.zimejums[i].x2;
                        ls = window.fabric.util.rotatePoint(new window.fabric.Point(elem.zimejums[i].x1, elem.zimejums[i].y1), centrs, rad);
                        le = window.fabric.util.rotatePoint(new window.fabric.Point(elem.zimejums[i].x2, elem.zimejums[i].y2), centrs, rad);
                        elem.zimejums[i].set({x1: ls.x, y1: ls.y, x2: le.x, y2: le.y});
                        attels.add(elem.zimejums[i]);
                        fn(i);
                    }
                }
                setTimeout(function(){
                    for (i = 0; i < 3; i++) {
                        obj.zimejums[i].animate('top', '+=' + (augstums + augstums / 4).toString(), { duration: 700, onChange: attels.renderAll.bind(attels), easing: window.fabric.util.ease.easeInQuad });
                }}, pozicija === 1 ? 0 : 500);
                setTimeout(function(){
                    var apjoms = (pozicija === 1 || pozicija === 2) ? '+=30' : '+=' + ((skaits - 1) * (platums + 20)).toString();
                    elem.zimejums[3].animate((pozicija === 1 || pozicija === 2) ? 'width' : 'left' , apjoms, { onChange: attels.renderAll.bind(attels), easing: window.fabric.util.ease.easeInQuad });
                    for (i = 4; i <= 5; i++) {
                        elem.zimejums[i].animate('left', apjoms, { onChange: attels.renderAll.bind(attels), easing: window.fabric.util.ease.easeInQuad });
                }}, (pozicija === 1) ? 850 : (pozicija === 2) ? 1350 : 0);
                if (pozicija === 3) {
                setTimeout(function(){
                    jauns.zimejums[3].animate('width', '+=30', { onChange: attels.renderAll.bind(attels), easing: window.fabric.util.ease.easeInQuad });
                    for (i = 4; i <= 5; i++) {
                        jauns.zimejums[i].animate('left', '+=30', { onChange: attels.renderAll.bind(attels), easing: window.fabric.util.ease.easeInQuad });
                }}, 1450);
                    gaidit += 700;
                }
            }
        } else {
            objekts.struktura = jauns;
            gaidit = 0;
        }
        objekts.aktivsElements = jauns;
        return gaidit;
    };
    this.dzest = function(atslega, attels) {
        var ieprieks = null;
        var elem = objekts.struktura;
        var nkElem = null;
        var fn = function(t, e, iep) {
            setTimeout(function(){
                e.zimejums[0].setStroke(iezimetaKrasa);
                if (iep) {
                    iep.zimejums[0].setStroke(ramjaKrasa);
                }
                attels.renderAll();
            }, t);
        };
        var i = 0;
        var sign = '';
        var size = 0;
        while (elem) {
            i++;
            if (elem.atslega === atslega) {
                objekts.atslegas.push(elem.atslega);
                if (attels) {
                    fn(i * 300, elem, ieprieks);
                    setTimeout(function(){
                        if (elem.nakosais) {
                            for (i = 3; i < elem.zimejums.length; i++) {
                                elem.zimejums[i].animate('left', '-=' + (elem.zimejums[0].width / 2).toString(), { onChange: attels.renderAll.bind(attels), easing: window.fabric.util.ease.easeInQuad });
                            }
                        }
                        if (ieprieks) {
                            if (elem.nakosais) {
                                sign = '+=';
                                size = ieprieks.zimejums[0].width;
                            } else
                            {
                                sign = '-=';
                                size = 0;
                            }
                            ieprieks.zimejums[3].animate('width', sign + (size + 20).toString(), { onChange: attels.renderAll.bind(attels), easing: window.fabric.util.ease.easeInQuad });
                            for (i = 4; i < ieprieks.zimejums.length; i++) {
                                ieprieks.zimejums[i].animate('left', sign + (size + 20).toString(), { onChange: attels.renderAll.bind(attels), easing: window.fabric.util.ease.easeInQuad });
                            }
                        }
                    }, i * 300);
                    setTimeout(function(){
                        for (i = 0; i < elem.zimejums.length; i++) {
                           if (i <= 2) {
                               elem.zimejums[i].animate('top', '-=' + (elem.zimejums[0].height + 20).toString(), { onChange: attels.renderAll.bind(attels), easing: window.fabric.util.ease.easeInQuad });
                           } else {
                               attels.remove(elem.zimejums[i]);
                           }
                        }
                        if (ieprieks) {
                            if (elem.nakosais) {
                                sign = '-=';
                                size = ieprieks.zimejums[0].width;
                            } else {
                                sign = '+=';
                                size = 0;
                            }
                            ieprieks.zimejums[3].animate('width', sign + (size + 20).toString(), { duration: 700, onChange: attels.renderAll.bind(attels), easing: window.fabric.util.ease.easeInQuad });
                            for (i = 4; i < ieprieks.zimejums.length; i++) {
                                ieprieks.zimejums[i].animate('left', sign + (size + 20).toString(), { duration: 700, onChange: attels.renderAll.bind(attels), easing: window.fabric.util.ease.easeInQuad });
                            }
                        }
                        if (elem.nakosais) {
                            nkElem = elem.nakosais;
                            while (nkElem) {
                                for (i = 0; i < nkElem.zimejums.length; i++) {
                                    nkElem.zimejums[i].animate('left', '-=' + (elem.zimejums[0].width + 20).toString(), { duration: 700, onChange: attels.renderAll.bind(attels), easing: window.fabric.util.ease.easeInQuad });
                                }
                                nkElem = nkElem.nakosais;
                            }
                        } else if (ieprieks) {
                            for (i = 3; i < ieprieks.zimejums.length; i++) {
                                attels.remove(ieprieks.zimejums[i]);
                            }
                        }
                    }, i * 300 + 500);
                }
                if (objekts.aktivsElements === elem) {
                    objekts.aktivsElements = elem.nakosais;
                }
                if (ieprieks) {
                    ieprieks.nakosais = elem.nakosais;
                } else {
                    objekts.struktura = elem.nakosais;
                }
                if (!objekts.aktivsElements) {
                    objekts.aktivsElements = ieprieks;
                }
                return i * 300 + 1200;
            }
            if (attels) {
                fn(i * 300, elem, ieprieks);
            }
            ieprieks = elem;
            elem = elem.nakosais;
        }
        return i * 300 + 100;
    };
    this.meklet = function(meklesana, vertiba, attels) {
        var ieprieks = null;
        var elem = objekts.struktura;
        var i = 0;
        var vertElem = null;
        var prevVertElem = null;
        var fn = function(t, e, iep, v, pv) {
            setTimeout(function(){
                if (e === v) {
                    if (pv) {
                        pv.zimejums[0].setStroke(ramjaKrasa);
                    }
                    e.zimejums[0].setStroke(aktivaKrasa);
                } else {
                    e.zimejums[0].setStroke(iezimetaKrasa);
                }
                if (iep && iep !== v) {
                    iep.zimejums[0].setStroke(ramjaKrasa);
                }
                attels.renderAll();
            }, t);
        };
        if (objekts.aktivsElements) {
            objekts.aktivsElements.zimejums[0].setStroke(ramjaKrasa);
            attels.renderAll();
        }
        while (elem) {
            i++;
            prevVertElem = vertElem;
            if (meklesana === 1) {
                if (!vertElem || elem.vertiba < vertElem.vertiba) {
                    vertElem = elem;
                }
            } else if (meklesana === 2) {
                 if (!vertElem || elem.vertiba > vertElem.vertiba) {
                    vertElem = elem;
                }
            } else if (elem.vertiba === vertiba) {
                objekts.aktivsElements = elem;
                if (attels) {
                    fn(i * 300, elem, ieprieks);
                }
                return i * 300;
            }
            if (attels) {
                fn(i * 300, elem, ieprieks, vertElem, prevVertElem);
            }
            ieprieks = elem;
            elem = elem.nakosais;
        }
        if (meklesana === 1 || meklesana === 2) {
            objekts.aktivsElements = vertElem;
        } else {
            objekts.aktivsElements = null;
        }
        return i * 300 + 100;
    };
    for (var i = 0; i < elementi; i++) {
        objekts.pievienot(dabutVertibu(), 0);
    }
    this.zimet = function(attels, ramis, teksts, linija) {
        var i = 0;
        ramis.top = 70 + ramis.height;
        if (this.struktura) {
            objekts.katramElementam(function(elem) {
                i++;
                if (elem === objekts.aktivsElements) {
                   ramis.setStroke(aktivaKrasa);
                } else {
                   ramis.setStroke(ramjaKrasa);
                }
                ramis.left = 50 + (ramis.width + 20) * i;
                attels.add(ramis);
                teksts.top = ramis.top + ramis.height / 4;
                teksts.left = ramis.left + (ramis.width / 4);
                teksts.setFontSize(40);
                teksts.setText(elem.vertiba.toString());
                attels.add(teksts);
                elem.zimejums = [ramis, teksts];
                teksts = window.fabric.util.object.clone(teksts);
                teksts.top = ramis.top + (ramis.height / 2) + 14;
                teksts.left = ramis.left + (ramis.width / 8);
                teksts.setFontSize(20);
                teksts.setText(elem.atslega.toString());
                attels.add(teksts);
                elem.zimejums = elem.zimejums.concat(teksts);
                ramis = window.fabric.util.object.clone(ramis);
                teksts = window.fabric.util.object.clone(teksts);
            });
            objekts.katramElementam(function(elem) {
                linija.set({x1: elem.zimejums[0].left + elem.zimejums[0].width / 4 * 3,
                            x2: elem.zimejums[0].left + elem.zimejums[0].width + 40,
                            y1: elem.zimejums[0].top + elem.zimejums[0].height / 5,
                            y2: elem.zimejums[0].top + elem.zimejums[0].height / 5});
                if (elem.nakosais) {
                    attels.add(linija);
                }
                elem.zimejums.push(linija);
                linija = window.fabric.util.object.clone(linija);
                linija.set({'x1': linija.x2 - 15, 'y1': linija.y1 - 5});
                if (elem.nakosais) {
                    attels.add(linija);
                }
                elem.zimejums.push(linija);
                linija = window.fabric.util.object.clone(linija);
                linija.set({'y1': linija.y1 + 10});
                if (elem.nakosais) {
                    attels.add(linija);
                }
                elem.zimejums.push(linija);
                linija = window.fabric.util.object.clone(linija);
            });
        } else {
            ramis.left = 70 + ramis.width;
            ramis.setStroke(ramjaKrasa);
            attels.add(ramis);
        }
    };
    return this;
};

// Divkāršsaistīts saraksts
Strukturas[c++].izveidot = function(elementi) {
    this.struktura = null;
    this.aktivsElements = null;
    this.atslegas = dabutAtslegas();
    var objekts = this;
    this.elements = function(vertiba) {
        this.vertiba = vertiba;
        this.atslega = objekts.atslegas.pop();
        this.zimejums = [];
        this.ieprieksejais = null;
        this.nakosais = null;
    };
    this.katramElementam = function(fn) {
        var elem = objekts.struktura;
        if (!elem) {
            return;
        }
        fn(elem);
        while (elem.nakosais) {
            elem = elem.nakosais;
            fn(elem);
        }
    };
    this.elementuSkaits = function() {
        var i = 0;
        objekts.katramElementam(function(elem) {
            i++;
        });
        return i;
    };
    this.pievienot = function(vertiba, pozicija, attels) {
        var jauns = new objekts.elements(vertiba);
        var i;
        var gaidit = 1300;
        var fnIezimet = function(t, e, iep) {
            setTimeout(function(){
                e.zimejums[0].setStroke(iezimetaKrasa);
                if (iep) {
                    iep.zimejums[0].setStroke(ramjaKrasa);
                }
                attels.renderAll();
            }, t);
        };
        if (objekts.struktura) {
            var elem;
            var obj;
            var platums;
            var augstums;
            var skaits = 1;
            var esk;
            if (pozicija === 3 && this.aktivsElements === objekts.struktura) {
                pozicija = 1;
            }
            if (attels) {
                if (objekts.struktura.zimejums.length > 0) {
                    platums = objekts.struktura.zimejums[0].width;
                    augstums = objekts.struktura.zimejums[0].height;
                }
                if (pozicija === 2) {
                    elem = objekts.struktura;
                    while (elem !== this.aktivsElements && elem) {
                        skaits++;
                        elem = elem.nakosais;
                    }
                }
                for (i = 0; i < objekts.struktura.zimejums.length; i++) {
                    obj = window.fabric.util.object.clone(objekts.struktura.zimejums[i]);
                    if (i === 0) {
                        obj.setStroke(ramjaKrasa);
                    } else if (i === 1) {
                        obj.setText(jauns.vertiba.toString());
                    } else if (i === 2) {
                        obj.setText(jauns.atslega.toString());
                    }
                    if (pozicija === 2) {
                        obj.left += skaits * (platums + 20);
                        if (i >= 3) {
                            obj.set({x1: obj.x1 + skaits * (platums + 20), x2: obj.x2 + skaits * (platums + 20)});
                        }
                    }
                    if (i < 3) {
                        obj.top -= augstums + augstums / 4;
                        attels.add(obj);
                    }
                    if (i === 0) {
                        attels.sendToBack(obj);
                    }
                    jauns.zimejums.push(obj);
                }
            }
            if (pozicija === 1) {
                elem = objekts.struktura;
                objekts.struktura = jauns;
                objekts.struktura.nakosais = elem;
                elem.ieprieksejais = objekts.struktura;
                do {
                    for (i = 0; i < elem.zimejums.length; i++) {
                        elem.zimejums[i].animate('left', '+=' + (platums + 20).toString(), { onChange: attels.renderAll.bind(attels), easing: window.fabric.util.ease.easeInQuad });
                    }
                    elem = elem.nakosais;
                } while (elem);
                elem = objekts.struktura;
                obj = elem;
            } else if (pozicija === 2 || pozicija === 3) {
                if (pozicija === 2) {
                    elem = objekts.aktivsElements.nakosais;
                    objekts.aktivsElements.nakosais = jauns;
                    jauns.ieprieksejais = objekts.aktivsElements;
                    obj = elem;
                    elem = jauns;
                    gaidit += 500;
                } else {
                    elem = objekts.struktura;
                    obj = null;
                    esk = this.elementuSkaits();
                    fnIezimet(skaits * (500 / esk), elem, obj);
                    while (elem.nakosais !== objekts.aktivsElements && elem.nakosais) {
                        skaits++;
                        if (attels) {
                            fnIezimet(skaits * (500 / esk), elem, obj);
                        }
                        obj = elem;
                        elem = elem.nakosais;
                    }
                    fnIezimet((skaits + 1) * (500 / esk), elem, obj);
                    elem.nakosais = jauns;
                    jauns.ieprieksejais = elem;
                    obj = objekts.aktivsElements;
                }
                jauns.nakosais = obj;
                if (obj) {
                    obj.ieprieksejais = jauns;
                }
                while (obj) {
                    for (i = 0; i < obj.zimejums.length; i++) {
                        obj.zimejums[i].animate('left', '+=' + (platums + 20).toString(), { onChange: attels.renderAll.bind(attels), easing: window.fabric.util.ease.easeInQuad });
                    }
                    obj = obj.nakosais;
                }
                obj = jauns;
            } else {
                esk = this.elementuSkaits();
                elem = objekts.struktura;
                obj = null;
                while (elem.nakosais) {
                   if (attels) {
                       fnIezimet(skaits * (500 / esk), elem, obj);
                   }
                   obj = elem;
                   elem = elem.nakosais;
                   skaits++;
                }
                if (attels) {
                    fnIezimet(skaits * (500 / esk), elem, obj);
                }
                elem.nakosais = jauns;
                 elem.nakosais.ieprieksejais = elem;
                obj = jauns;
            }
            if (attels) {
                if (pozicija === 1 || pozicija === 2 || pozicija === 3) {
                    if (!jauns.nakosais) {
                        elem = objekts.aktivsElements;
                    }
                    if (pozicija === 3) {
                        esk = elem;
                        elem = jauns;
                        for (i = 3; i <= 5; i++) {
                             elem.zimejums[i].set({x1: elem.zimejums[i].x1 + (platums + 20) * skaits, x2: elem.zimejums[i].x2 + (platums + 20) * skaits});
                        }
                    }
                    (function(e) {
                        setTimeout(function(){
                            e.zimejums[3].set({x2: e.zimejums[3].x2 - 30});
                            e.zimejums[4].set({x1: e.zimejums[4].x1 - 30, x2: e.zimejums[4].x2 - 30});
                            e.zimejums[5].set({x1: e.zimejums[5].x1 - 30, x2: e.zimejums[5].x2 - 30});
                            attels.add(e.zimejums[3]);
                            attels.add(e.zimejums[4]);
                            attels.add(e.zimejums[5]);
                        }, (pozicija === 2 || pozicija === 3) ? 1300 : 750);
                    }(elem));
                    if (pozicija === 3) {
                        elem = esk;
                    }
                }
                if (pozicija === 0 || pozicija === 3) {
                    for (i = 0; i < 3; i++) {
                        jauns.zimejums[i].animate('left', '+=' + ((platums + 20) * skaits).toString(), { onChange: attels.renderAll.bind(attels), easing: window.fabric.util.ease.easeInQuad });
                    }
                    var rad = window.fabric.util.degreesToRadians(-40);
                    var ls;
                    var le;
                    elem.zimejums[3].x1 = objekts.struktura.zimejums[3].x1;
                    elem.zimejums[3].x2 = objekts.struktura.zimejums[3].x2;
                    var centrs = new window.fabric.Point(elem.zimejums[3].x1, elem.zimejums[3].y1);
                    var fn = function(x) {
                        setTimeout(function(){
                            var c = new window.fabric.Point(centrs.x + (skaits - 1) * (platums + 20), centrs.y);
                            elem.zimejums[x].x1 += (skaits - 1) * (platums + 20);
                            elem.zimejums[x].x2 += (skaits - 1) * (platums + 20);
                            var rad = window.fabric.util.degreesToRadians(40);
                            var ls = window.fabric.util.rotatePoint(new window.fabric.Point(elem.zimejums[x].x1, elem.zimejums[x].y1), c, rad);
                            var le = window.fabric.util.rotatePoint(new window.fabric.Point(elem.zimejums[x].x2, elem.zimejums[x].y2), c, rad);
                            var fn = { onChange: attels.renderAll.bind(attels), easing: window.fabric.util.ease.easeInQuad };
                            elem.zimejums[x].animate('x1', ls.x, fn);
                            elem.zimejums[x].animate('y1', ls.y, fn);
                            elem.zimejums[x].animate('x2', le.x, fn);
                            elem.zimejums[x].animate('y2', le.y, fn);
                        }, 700);
                    };
                    for (i = 3; i <= 5; i++) {
                        elem.zimejums[i].x1 = objekts.struktura.zimejums[i].x1;
                        elem.zimejums[i].x2 = objekts.struktura.zimejums[i].x2;
                        ls = window.fabric.util.rotatePoint(new window.fabric.Point(elem.zimejums[i].x1, elem.zimejums[i].y1), centrs, rad);
                        le = window.fabric.util.rotatePoint(new window.fabric.Point(elem.zimejums[i].x2, elem.zimejums[i].y2), centrs, rad);
                        elem.zimejums[i].set({x1: ls.x, y1: ls.y, x2: le.x, y2: le.y});
                        attels.add(elem.zimejums[i]);
                        fn(i);
                    }
                }
                setTimeout(function(){
                    for (i = 0; i < 3; i++) {
                        obj.zimejums[i].animate('top', '+=' + (augstums + augstums / 4).toString(), { duration: 700, onChange: attels.renderAll.bind(attels), easing: window.fabric.util.ease.easeInQuad });
                }}, pozicija === 1 ? 0 : 500);
                setTimeout(function(){
                    var apjoms = (pozicija === 1 || pozicija === 2) ? '+=30' : '+=' + ((skaits - 1) * (platums + 20)).toString();
                    elem.zimejums[3].animate((pozicija === 1 || pozicija === 2) ? 'width' : 'left' , apjoms, { onChange: attels.renderAll.bind(attels), easing: window.fabric.util.ease.easeInQuad });
                    for (i = 4; i <= 5; i++) {
                        elem.zimejums[i].animate('left', apjoms, { onChange: attels.renderAll.bind(attels), easing: window.fabric.util.ease.easeInQuad });
                }}, (pozicija === 1) ? 850 : (pozicija === 2) ? 1350 : 0);
                if (pozicija === 3) {
                setTimeout(function(){
                    jauns.zimejums[3].animate('width', '+=30', { onChange: attels.renderAll.bind(attels), easing: window.fabric.util.ease.easeInQuad });
                    for (i = 4; i <= 5; i++) {
                        jauns.zimejums[i].animate('left', '+=30', { onChange: attels.renderAll.bind(attels), easing: window.fabric.util.ease.easeInQuad });
                }}, 1450);
                    gaidit += 700;
                }
            }
        } else {
            objekts.struktura = jauns;
            gaidit = 0;
        }
        objekts.aktivsElements = jauns;
        return gaidit;
    };
    this.dzest = function(atslega, attels) {
        var elem = objekts.struktura;
        var nkElem = null;
        var fn = function(t, e) {
            setTimeout(function(){
                e.zimejums[0].setStroke(iezimetaKrasa);
                if (e.ieprieksejais) {
                    e.ieprieksejais.zimejums[0].setStroke(ramjaKrasa);
                }
                attels.renderAll();
            }, t);
        };
        var i = 0;
        var sign = '';
        var size = 0;
        while (elem) {
            i++;
            if (elem.atslega === atslega) {
                objekts.atslegas.push(elem.atslega);
                if (attels) {
                    fn(i * 300, elem);
                    setTimeout(function(){
                        if (elem.nakosais) {
                            for (i = 3; i < 6; i++) {
                                elem.zimejums[i].animate('left', '-=' + (elem.zimejums[0].width / 2).toString(), { onChange: attels.renderAll.bind(attels), easing: window.fabric.util.ease.easeInQuad });
                            }
                        }
                        if (elem.ieprieksejais) {
                            if (elem.nakosais) {
                                sign = '+=';
                                size = elem.ieprieksejais.zimejums[0].width;
                            } else
                            {
                                sign = '-=';
                                size = 0;
                            }
                            elem.ieprieksejais.zimejums[3].animate('width', sign + (size + 20).toString(), { onChange: attels.renderAll.bind(attels), easing: window.fabric.util.ease.easeInQuad });
                            for (i = 4; i < 6; i++) {
                                elem.ieprieksejais.zimejums[i].animate('left', sign + (size + 20).toString(), { onChange: attels.renderAll.bind(attels), easing: window.fabric.util.ease.easeInQuad });
                            }
                        }
                    }, i * 300);
                    setTimeout(function(){
                        for (i = 0; i < elem.zimejums.length; i++) {
                           if (i <= 2) {
                               elem.zimejums[i].animate('top', '-=' + (elem.zimejums[0].height + 20).toString(), { onChange: attels.renderAll.bind(attels), easing: window.fabric.util.ease.easeInQuad });
                           } else {
                               attels.remove(elem.zimejums[i]);
                           }
                        }
                        if (elem.ieprieksejais) {
                            if (elem.nakosais) {
                                sign = '-=';
                                size = elem.ieprieksejais.zimejums[0].width;
                            } else {
                                sign = '+=';
                                size = 0;
                            }
                            elem.ieprieksejais.zimejums[3].animate('width', sign + (size + 20).toString(), { duration: 700, onChange: attels.renderAll.bind(attels), easing: window.fabric.util.ease.easeInQuad });
                            for (i = 4; i < 6; i++) {
                                elem.ieprieksejais.zimejums[i].animate('left', sign + (size + 20).toString(), { duration: 700, onChange: attels.renderAll.bind(attels), easing: window.fabric.util.ease.easeInQuad });
                            }
                        }
                        if (elem.nakosais) {
                            nkElem = elem.nakosais;
                            while (nkElem) {
                                for (i = 0; i < nkElem.zimejums.length; i++) {
                                    nkElem.zimejums[i].animate('left', '-=' + (elem.zimejums[0].width + 20).toString(), { duration: 700, onChange: attels.renderAll.bind(attels), easing: window.fabric.util.ease.easeInQuad });
                                }
                                nkElem = nkElem.nakosais;
                            }
                        } else if (elem.ieprieksejais) {
                            for (i = 3; i < 6; i++) {
                                attels.remove(elem.ieprieksejais.zimejums[i]);
                            }
                        }
                    }, i * 300 + 500);
                }
                if (objekts.aktivsElements === elem) {
                    objekts.aktivsElements = elem.nakosais;
                }
                if (elem.ieprieksejais) {
                    elem.ieprieksejais.nakosais = elem.nakosais;
                } else {
                    objekts.struktura = elem.nakosais;
                }
                if (elem.nakosais) {
                    elem.nakosais.ieprieksejais = elem.ieprieksejais;
                }
                if (!objekts.aktivsElements) {
                    objekts.aktivsElements = elem.ieprieksejais;
                }
                return i * 300 + 1200;
            }
            if (attels) {
                fn(i * 300, elem);
            }
            elem = elem.nakosais;
        }
        return i * 300 + 100;
    };
    this.meklet = function(meklesana, vertiba, attels) {
        var ieprieks = null;
        var elem = objekts.struktura;
        var i = 0;
        var vertElem = null;
        var prevVertElem = null;
        var fn = function(t, e, iep, v, pv) {
            setTimeout(function(){
                if (e === v) {
                    if (pv) {
                        pv.zimejums[0].setStroke(ramjaKrasa);
                    }
                    e.zimejums[0].setStroke(aktivaKrasa);
                } else {
                    e.zimejums[0].setStroke(iezimetaKrasa);
                }
                if (iep && iep !== v) {
                    iep.zimejums[0].setStroke(ramjaKrasa);
                }
                attels.renderAll();
            }, t);
        };
        if (objekts.aktivsElements) {
            objekts.aktivsElements.zimejums[0].setStroke(ramjaKrasa);
            attels.renderAll();
        }
        while (elem) {
            i++;
            prevVertElem = vertElem;
            if (meklesana === 1) {
                if (!vertElem || elem.vertiba < vertElem.vertiba) {
                    vertElem = elem;
                }
            } else if (meklesana === 2) {
                 if (!vertElem || elem.vertiba > vertElem.vertiba) {
                    vertElem = elem;
                }
            } else if (elem.vertiba === vertiba) {
                objekts.aktivsElements = elem;
                if (attels) {
                    fn(i * 300, elem, ieprieks);
                }
                return i * 300;
            }
            if (attels) {
                fn(i * 300, elem, ieprieks, vertElem, prevVertElem);
            }
            ieprieks = elem;
            elem = elem.nakosais;
        }
        if (meklesana === 1 || meklesana === 2) {
            objekts.aktivsElements = vertElem;
        } else {
            objekts.aktivsElements = null;
        }
        return i * 300 + 100;
    };
    for (var i = 0; i < elementi; i++) {
        objekts.pievienot(dabutVertibu(), 0);
    }
    this.zimet = function(attels, ramis, teksts, linija) {
        var i = 0;
        ramis.top = 70 + ramis.height;
        teksts.top = ramis.top + ramis.height / 4;
        if (this.struktura) {
        objekts.katramElementam(function(elem) {
            i++;
            if (elem === objekts.aktivsElements) {
                ramis.setStroke(aktivaKrasa);
            } else {
                ramis.setStroke(ramjaKrasa);
            }
                ramis.left = 50 + (ramis.width + 20) * i;
                attels.add(ramis);
                teksts.top = ramis.top + ramis.height / 4;
                teksts.left = ramis.left + (ramis.width / 4);
                teksts.setFontSize(40);
                teksts.setText(elem.vertiba.toString());
                attels.add(teksts);
                elem.zimejums = [ramis, teksts];
                teksts = window.fabric.util.object.clone(teksts);
                teksts.top = ramis.top + (ramis.height / 2) + 14;
                teksts.left = ramis.left + (ramis.width / 8);
                teksts.setFontSize(20);
                teksts.setText(elem.atslega.toString());
                attels.add(teksts);
                elem.zimejums = elem.zimejums.concat(teksts);
                ramis = window.fabric.util.object.clone(ramis);
                teksts = window.fabric.util.object.clone(teksts);
        });
        objekts.katramElementam(function(elem) {
                linija.set({x1: elem.zimejums[0].left + elem.zimejums[0].width / 4 * 3,
                            x2: elem.zimejums[0].left + elem.zimejums[0].width + 40,
                            y1: elem.zimejums[0].top + elem.zimejums[0].height / 5,
                            y2: elem.zimejums[0].top + elem.zimejums[0].height / 5});
                if (elem.nakosais) {
                    attels.add(linija);
                }
                elem.zimejums.push(linija);
                linija = window.fabric.util.object.clone(linija);
                linija.set({'x1': linija.x2 - 15, 'y1': linija.y1 - 5});
                if (elem.nakosais) {
                    attels.add(linija);
                }
                elem.zimejums.push(linija);
                linija = window.fabric.util.object.clone(linija);
                linija.set({'y1': linija.y1 + 10});
                if (elem.nakosais) {
                    attels.add(linija);
                }
                elem.zimejums.push(linija);
                linija = window.fabric.util.object.clone(linija);

            linija.set({x1: elem.zimejums[0].left + elem.zimejums[0].width / 4,
                        x2: elem.zimejums[0].left - 20 - elem.zimejums[0].width / 4,
                        y1: elem.zimejums[0].top + elem.zimejums[0].height - elem.zimejums[0].height / 6,
                        y2: elem.zimejums[0].top + elem.zimejums[0].height - elem.zimejums[0].height / 6});
                if (elem.ieprieksejais) {
                    attels.add(linija);
                }
            elem.zimejums.push(linija);
            linija = window.fabric.util.object.clone(linija);
            linija.set({x1: elem.zimejums[0].left - 20 - elem.zimejums[0].width / 4 + 15,
                        y1: linija.y1 - 5});
                if (elem.ieprieksejais) {
                    attels.add(linija);
                }
            elem.zimejums.push(linija);
            linija = window.fabric.util.object.clone(linija);
            linija.set({'y1': linija.y1 + 10});
                if (elem.ieprieksejais) {
                    attels.add(linija);
                }
            elem.zimejums.push(linija);
            linija = window.fabric.util.object.clone(linija);
        });
        } else {
            ramis.left = 70 + ramis.width;
            ramis.setStroke(ramjaKrasa);
            attels.add(ramis);
        }
    };
    return this;
};

// Steks
Strukturas[c++].izveidot = function(elementi) {
    this.struktura = [];
    var objekts = this;
    this.elements = function(vertiba) {
        this.vertiba = vertiba;
        this.zimejums = [];
    };
    this.pievienot = function(vertiba, pozicija, attels) {
        if (pozicija === 1) {
            objekts.struktura.unshift(new objekts.elements(vertiba));
        } else {
            objekts.struktura.push(new objekts.elements(vertiba));
        }
        return 0;
    };
    for (var i = 0; i < elementi; i++) {
        objekts.pievienot(dabutVertibu(), 0);
    }
    this.zimet = function(attels, ramis, teksts, linija) {
        ramis.left = attels.width / 2;
        teksts.left = ramis.left + ramis.width / 4;
        for (var i = objekts.struktura.length - 1; i >= 0; i--) {
            if (i === 0) {
                ramis.setStroke(aktivaKrasa);
            } else {
                ramis.setStroke(ramjaKrasa);
            }
            ramis.top = 50 + (ramis.height + 3) * i;
            teksts.setText(objekts.struktura[objekts.struktura.length - 1 - i].vertiba.toString());
            teksts.top = ramis.top + (ramis.height / 4);
            attels.add(ramis);
            attels.add(teksts);
            objekts.struktura[i].zimejums = [ramis, teksts];
            ramis = window.fabric.util.object.clone(ramis);
            teksts = window.fabric.util.object.clone(teksts);
        }
    };
    return this;
};

// Rinda
Strukturas[c++].izveidot = function(elementi) {
    this.struktura = [];
    var objekts = this;
    this.elements = function(vertiba) {
        this.vertiba = vertiba;
        this.zimejums = [];
    };
    this.pievienot = function(vertiba, pozicija, attels) {
        if (pozicija === 1) {
            objekts.struktura.unshift(new objekts.elements(vertiba));
        } else {
            objekts.struktura.push(new objekts.elements(vertiba));
        }
        return 0;
    };
    for (var i = 0; i < elementi; i++) {
        objekts.pievienot(dabutVertibu(), 0);
    }
    this.zimet = function(attels, ramis, teksts, linija) {
        ramis.top = 70 + ramis.height;
        teksts.top = ramis.top + ramis.height / 4;
        for (var i = objekts.struktura.length - 1; i >= 0; i--) {
            if (i === 0 || i === objekts.struktura.length - 1) {
                ramis.setStroke(aktivaKrasa);
            } else {
                ramis.setStroke(ramjaKrasa);
            }
            ramis.left = 200 + (ramis.width + 3) * i;
            teksts.setText(objekts.struktura[i].vertiba.toString());
            teksts.left = ramis.left + (ramis.width / 4);
            attels.add(ramis);
            attels.add(teksts);
            objekts.struktura[i].zimejums = [ramis, teksts];
            ramis = window.fabric.util.object.clone(ramis);
            teksts = window.fabric.util.object.clone(teksts);
        }
    };
    return this;
};

// Kaudze
Strukturas[c++].izveidot = function(elementi) {
    this.struktura = [];
    var objekts = this;
    this.elements = function(vertiba) {
        this.vertiba = vertiba;
        this.zimejums = [];
    };
    this.pievienot = function(vertiba, pozicija, attels) {
        if (pozicija === 1) {
            objekts.struktura.unshift(new objekts.elements(vertiba));
        } else {
            objekts.struktura.push(new objekts.elements(vertiba));
            var idx = objekts.struktura.length - 1;
            var elem = objekts.struktura[idx];
            var virsas_idx = Math.floor((idx - 1) / 2);
            var tmp;
            while (virsas_idx >= 0) {
                if (elem.vertiba > objekts.struktura[virsas_idx].vertiba) {
                    tmp = elem.vertiba;
                    elem.vertiba = objekts.struktura[virsas_idx].vertiba;
                    objekts.struktura[virsas_idx].vertiba = tmp;
                } else {
                    break;
                }
                elem = objekts.struktura[virsas_idx];
                virsas_idx = Math.floor((virsas_idx - 1) / 2);
            }
        }
        return 0;
    };
    for (var i = 0; i < elementi; i++) {
        objekts.pievienot(dabutVertibu(), 0);
    }
    this.zimet = function(attels, ramis, teksts, linija) {
        for (var i = 0; i < objekts.struktura.length; i++) {
            var rinda = Math.floor(Math.log(i + 1) / Math.LN2);
            ramis.top = 50 + (ramis.height + 20) * rinda;
            if (i === objekts.struktura.length - 1) {
                ramis.setStroke(aktivaKrasa);
            } else {
                ramis.setStroke(ramjaKrasa);
            }
            if (i === 0) {
                ramis.left = attels.width / 2;
            } else {
                ramis.left = objekts.struktura[Math.floor((i - 1) / 2)].zimejums[0].left;
                var nobide = attels.width / (Math.pow(2, rinda + 1));
                if (i % 2 === 0) {
                   nobide *= -1;
                }
                ramis.left -= nobide;
            }
            teksts.top = ramis.top + ramis.height / 4;
            teksts.left = ramis.left + ramis.width / 4;
            teksts.setText(objekts.struktura[i].vertiba.toString());
            attels.add(ramis);
            attels.add(teksts);
            objekts.struktura[i].zimejums = [ramis, teksts];
            ramis = window.fabric.util.object.clone(ramis);
            teksts = window.fabric.util.object.clone(teksts);
        }
    };
    return this;
};

// Binārs koks
Strukturas[c++].izveidot = function(elementi) {
    this.struktura = null;
    var objekts = this;
    this.elements = function(vertiba) {
        this.vertiba = vertiba;
        this.zimejums = [];
        this.kreisais = null;
        this.labais = null;
    };
    this.katramElementam = function(fn) {
        var elem = objekts.struktura;
        var apskatit = [];
        var lvl = 0;
        var kreisais = true;
        var virsa = null;
        while (apskatit.length > 0 || elem) {
            if (elem) {
                fn(elem, virsa, lvl, kreisais);
                lvl++;
                virsa = elem;
                if (elem.labais) {
                    apskatit.push([elem.labais, virsa, lvl]);
                }
                elem = elem.kreisais;
                kreisais = true;
            } else {
                var j = apskatit.pop();
                elem = null;
                if (j) {
                    elem = j[0];
                    virsa = j[1];
                    lvl = j[2];
                    kreisais = false;
                }
            }
        }
    };
    this.pievienot = function(vertiba, pozicija, attels) {
        var elem;
        if (objekts.struktura) {
            if (pozicija === 1) {
              elem = objekts.struktura;
              objekts.struktura = new objekts.elements(vertiba);
              if (Math.floor(Math.random() * 2) % 2 === 0) {
                  objekts.struktura.kreisais = elem;
              } else {
                  objekts.struktura.labais = elem;
              }
            } else {
                elem = objekts.struktura;
                var j = true;
                var k;
                while (j) {
                    k = (Math.floor(Math.random() * 2)) % 2 === 0;
                    if (!elem.kreisais && !elem.labais) {
                        if (k) {
                            elem.kreisais = new objekts.elements(vertiba);
                        } else {
                            elem.labais = new objekts.elements(vertiba);
                        }
                        j = false;
                    } else {
                        if (!elem.kreisais && k) {
                            elem.kreisais = new objekts.elements(vertiba);
                            j = false;
                        } else if (!elem.labais && !k) {
                            elem.labais = new objekts.elements(vertiba);
                            j = false;
                        } else {
                            if (elem.kreisais) {
                                elem = elem.kreisais;
                            } else {
                                elem = elem.labais;
                            }
                        }
                    }
                }
            }
        } else {
            objekts.struktura = new objekts.elements(vertiba);
        }
        return 0;
    };
    for (var i = 0; i < elementi; i++) {
        objekts.pievienot(dabutVertibu(), 0);
    }
    this.zimet = function(attels, ramis, teksts, linija) {
        objekts.katramElementam(function(elem, virsa, lvl, kreisais) {
            ramis.top = 50 + (ramis.height + 20) * lvl;
            if (lvl === 0) {
                ramis.left = attels.width / 2;
            } else {
                ramis.left = virsa.zimejums[0].left;
                var nobide = attels.width / Math.pow(2, lvl + 1);
                if (!kreisais) {
                   nobide *= -1;
                }
                ramis.left -= nobide;
            }
            teksts.top = ramis.top + ramis.height / 4;
            teksts.left = ramis.left + ramis.width / 4;
            teksts.setText(elem.vertiba.toString());
            attels.add(ramis);
            attels.add(teksts);
            elem.zimejums = [ramis, teksts];
            ramis = window.fabric.util.object.clone(ramis);
            teksts = window.fabric.util.object.clone(teksts);
        });
        objekts.katramElementam(function(elem, virsa, lvl, kreisais) {
            if (virsa) {
                linija.set({x1: virsa.zimejums[0].left + virsa.zimejums[0].width / 4,
                            x2: elem.zimejums[0].left + elem.zimejums[0].width / 2,
                            y1: virsa.zimejums[0].top + virsa.zimejums[0].height / 5 * 4,
                            y2: elem.zimejums[0].top + elem.zimejums[0].height / 5});
                if (!kreisais) {
                    linija.set({'x1': linija.x1 + virsa.zimejums[0].width / 4 * 2});
                }
                attels.add(linija);
                elem.zimejums.push(linija);
                linija = window.fabric.util.object.clone(linija);
                var zeta = Math.atan2(linija.y1 - linija.y2, linija.x1 - linija.x2);
                linija.set({'x1': linija.x2 - 15 * Math.cos(zeta + 2.8), 'y1': linija.y2 - 15 * Math.sin(zeta + 2.8)});
                attels.add(linija);
                elem.zimejums.push(linija);
                linija = window.fabric.util.object.clone(linija);
                linija.set({'x1': linija.x2 + 15 * Math.cos(zeta + 0.35), 'y1': linija.y2 + 15 * Math.sin(zeta + 0.35)});
                attels.add(linija);
                elem.zimejums.push(linija);
                linija = window.fabric.util.object.clone(linija);
            }
        });
    };
    return this;
};

// AVL koks
Strukturas[c++].izveidot = function(elementi) {
    this.struktura = null;
    var objekts = this;
    this.elements = function(vertiba) {
        this.vertiba = vertiba;
        this.zimejums = [];
        this.kreisais = null;
        this.labais = null;
    };
    this.pievienot = function(vertiba, pozicija, attels) {
        return 0;
    };
    for (var i = 0; i < elementi; i++) {
        objekts.pievienot(dabutVertibu(), 0);
    }
    this.zimet = function(attels, ramis, teksts, linija) {
    };
    return this;
};

// Meklēšanas koks
Strukturas[c++].izveidot = function(elementi) {
    this.struktura = null;
    var objekts = this;
    this.elements = function(vertiba) {
        this.vertiba = vertiba;
        this.zimejums = [];
        this.kreisais = null;
        this.labais = null;
    };
    this.pievienot = function(vertiba, pozicija, attels) {
        return 0;
    };
    this.zimet = function(attels, ramis, teksts, linija) {
    };
    return this;
};

export default Strukturas;
