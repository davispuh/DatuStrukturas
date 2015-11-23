
var Strukturas = [
    {
        id: "vienkars_saraksts",
        nosaukums: "Vienkāršsaistīts saraksts",
        izveidot: null
    },
    {
        id: "divkars_saraksts",
        nosaukums: "Divkāršsaistīts saraksts",
        izveidot: null
    },
    {
        id: "steks",
        nosaukums: "Steks",
        izveidot: null
    },
    {
        id: "rinda",
        nosaukums: "Rinda",
        izveidot: null
    },
    {
        id: "kaudze",
        nosaukums: "Kaudze",
        izveidot: null
    },
    {
        id: "binars_koks",
        nosaukums: "Binārs koks",
        izveidot: null
    },
    {
        id: "avl_koks",
        nosaukums: "AVL koks",
        izveidot: null
    },
    {
        id: "meklesanas_koks",
        nosaukums: "Meklēšanas koks",
        izveidot: null
    }
];

var c = 0;

function dabutVertibu() {
    return Math.round(Math.random() * 99);
}

Strukturas[c++].izveidot = function(elementi) {
    this.struktura = null;
    var objekts = this;
    this.elements = function(vertiba) {
        this.vertiba = vertiba;
        this.zimejums = [];
        this.nakosais = null;
    };
    this.katramElementam = function(fn) {
        var elem = objekts.struktura;
        fn(elem);
        while (elem.nakosais) {
            elem = elem.nakosais;
            fn(elem);
        }
    };
    this.iegutBeigas = function() {
        var elem = objekts.struktura;
        while (elem.nakosais) {
            elem = elem.nakosais;
        }
        return elem;
    };
    this.pievienot = function(vertiba, sakuma) {
        if (objekts.struktura) {
            var elem;
            if (sakuma) {
                elem = objekts.struktura;
                objekts.struktura = new objekts.elements(vertiba);
                objekts.struktura.nakosais = elem;
            } else {
                elem = objekts.iegutBeigas();
                elem.nakosais = new objekts.elements(vertiba);
            }
        } else {
            objekts.struktura = new objekts.elements(vertiba);
        }
    };
    for (var i = 0; i < elementi; i++) {
        objekts.pievienot(dabutVertibu(), false);
    }
    this.zimet = function(attels, ramis, teksts, linija) {
        var i = 0;
        objekts.katramElementam(function(elem) {
            i++;
            ramis.left = 50 + (ramis.width + 20) * i;
            teksts.setText(elem.vertiba.toString());
            teksts.left = ramis.left + (ramis.width / 4);
            attels.add(ramis);
            attels.add(teksts);
            elem.zimejums = [ramis, teksts];
            ramis = window.fabric.util.object.clone(ramis);
            teksts = window.fabric.util.object.clone(teksts);
        });
        objekts.katramElementam(function(elem) {
            if (elem.nakosais) {
                linija.set({x1: elem.zimejums[0].left + elem.zimejums[0].width / 4 * 3,
                            x2: elem.zimejums[0].left + elem.zimejums[0].width + 40,
                            y1: elem.zimejums[0].top + elem.zimejums[0].height / 5,
                            y2: elem.zimejums[0].top + elem.zimejums[0].height / 5});
                attels.add(linija);
                elem.zimejums.push(linija);
                linija = window.fabric.util.object.clone(linija);
                linija.set({'x1': linija.x2 - 15, 'y1': linija.y1 - 5});
                attels.add(linija);
                elem.zimejums.push(linija);
                linija = window.fabric.util.object.clone(linija);
                linija.set({'y1': linija.y1 + 10});
                attels.add(linija);
                elem.zimejums.push(linija);
                linija = window.fabric.util.object.clone(linija);
            }
        });
    };
    return this;
};

Strukturas[c++].izveidot = function(elementi) {
    this.struktura = null;
    var objekts = this;
    this.elements = function(vertiba) {
        this.vertiba = vertiba;
        this.zimejums = [];
        this.ieprieksejais = null;
        this.nakosais = null;
    };
    this.katramElementam = function(fn) {
        var elem = objekts.struktura;
        fn(elem);
        while (elem.nakosais) {
            elem = elem.nakosais;
            fn(elem);
        }
    };
    this.iegutBeigas = function(sakuma) {
        var elem = objekts.struktura;
        while (elem.nakosais) {
            elem = elem.nakosais;
        }
        return elem;
    };
    this.pievienot = function(vertiba, sakuma) {
        if (objekts.struktura) {
            var elem;
            if (sakuma) {
                elem = objekts.struktura;
                objekts.struktura = new objekts.elements(vertiba);
                objekts.struktura.nakosais = elem;
                elem.ieprieksejais = objekts.struktura;
            } else {
                elem = objekts.iegutBeigas(sakuma);
                elem.nakosais = new objekts.elements(vertiba);
                elem.nakosais.ieprieksejais = elem;
            }
        } else {
            objekts.struktura = new objekts.elements(vertiba);
        }
    };
    for (var i = 0; i < elementi; i++) {
        objekts.pievienot(dabutVertibu(), false);
    }
    this.zimet = function(attels, ramis, teksts, linija) {
        var i = 0;
        objekts.katramElementam(function(elem) {
            i++;
            ramis.left = 50 + (ramis.width + 20) * i;
            teksts.setText(elem.vertiba.toString());
            teksts.left = ramis.left + (ramis.width / 4);
            attels.add(ramis);
            attels.add(teksts);
            elem.zimejums = [ramis, teksts];
            ramis = window.fabric.util.object.clone(ramis);
            teksts = window.fabric.util.object.clone(teksts);
        });
        objekts.katramElementam(function(elem) {
            if (elem.nakosais) {
                linija.set({x1: elem.zimejums[0].left + elem.zimejums[0].width / 4 * 3,
                            x2: elem.zimejums[0].left + elem.zimejums[0].width + 40,
                            y1: elem.zimejums[0].top + elem.zimejums[0].height / 5,
                            y2: elem.zimejums[0].top + elem.zimejums[0].height / 5});
                attels.add(linija);
                elem.zimejums.push(linija);
                linija = window.fabric.util.object.clone(linija);
                linija.set({'x1': linija.x2 - 15, 'y1': linija.y1 - 5});
                attels.add(linija);
                elem.zimejums.push(linija);
                linija = window.fabric.util.object.clone(linija);
                linija.set({'y1': linija.y1 + 10});
                attels.add(linija);
                elem.zimejums.push(linija);
                linija = window.fabric.util.object.clone(linija);
            }
            if (elem.ieprieksejais) {
            linija.set({x1: elem.zimejums[0].left + elem.zimejums[0].width / 4,
                        x2: elem.zimejums[0].left - 20 - elem.zimejums[0].width / 4,
                        y1: elem.zimejums[0].top + elem.zimejums[0].height - elem.zimejums[0].height / 6,
                        y2: elem.zimejums[0].top + elem.zimejums[0].height - elem.zimejums[0].height / 6});
            attels.add(linija);
            elem.zimejums.push(linija);
            linija = window.fabric.util.object.clone(linija);
            linija.set({x1: elem.zimejums[0].left - 20 - elem.zimejums[0].width / 4 + 15,
                        y1: linija.y1 - 5});
            attels.add(linija);
            elem.zimejums.push(linija);
            linija = window.fabric.util.object.clone(linija);
            linija.set({'y1': linija.y1 + 10});
            attels.add(linija);
            elem.zimejums.push(linija);
            linija = window.fabric.util.object.clone(linija);
            }
        });
    };
    return this;
};

Strukturas[c++].izveidot = function(elementi) {
    this.struktura = [];
    var objekts = this;
    this.elements = function(vertiba) {
        this.vertiba = vertiba;
        this.zimejums = [];
    };
    this.pievienot = function(vertiba, sakuma) {
        if (sakuma) {
            objekts.struktura.unshift(new objekts.elements(vertiba));
        } else {
            objekts.struktura.push(new objekts.elements(vertiba));
        }
    };
    for (var i = 0; i < elementi; i++) {
        objekts.pievienot(dabutVertibu(), false);
    }
    this.zimet = function(attels, ramis, teksts, linija) {
        ramis.left = 200;
        teksts.left = 215;
        for (var i = 0; i < objekts.struktura.length; i++) {
            ramis.top = 50 + (ramis.height + 2) * i;
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

Strukturas[c++].izveidot = function(elementi) {
    this.struktura = [];
    var objekts = this;
    this.elements = function(vertiba) {
        this.vertiba = vertiba;
        this.zimejums = [];
    };
    this.pievienot = function(vertiba, sakuma) {
        if (sakuma) {
            objekts.struktura.unshift(new objekts.elements(vertiba));
        } else {
            objekts.struktura.push(new objekts.elements(vertiba));
        }
    };
    for (var i = 0; i < elementi; i++) {
        objekts.pievienot(dabutVertibu(), false);
    }
    this.zimet = function(attels, ramis, teksts, linija) {
        for (var i = 0; i < objekts.struktura.length; i++) {
            ramis.left = 50 + (ramis.width + 2) * i;
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

Strukturas[c++].izveidot = function(elementi) {
    this.struktura = [];
    var objekts = this;
    this.elements = function(vertiba) {
        this.vertiba = vertiba;
        this.zimejums = [];
    };
    this.pievienot = function(vertiba, sakuma) {
        if (sakuma) {
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
    };
    for (var i = 0; i < elementi; i++) {
        objekts.pievienot(dabutVertibu(), false);
    }
    this.zimet = function(attels, ramis, teksts, linija) {
        for (var i = 0; i < objekts.struktura.length; i++) {
            var rinda = Math.floor(Math.log(i + 1) / Math.LN2);
            ramis.top = 50 + (ramis.height + 20) * rinda;
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
    this.pievienot = function(vertiba, sakuma) {
        var elem;
        if (objekts.struktura) {
            if (sakuma) {
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
    };
    for (var i = 0; i < elementi; i++) {
        objekts.pievienot(dabutVertibu(), false);
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

Strukturas[c++].izveidot = function(elementi) {
    this.struktura = null;
    var objekts = this;
    this.elements = function(vertiba) {
        this.vertiba = vertiba;
        this.zimejums = [];
        this.kreisais = null;
        this.labais = null;
    };
    this.pievienot = function(vertiba, sakuma) {
    };
    for (var i = 0; i < elementi; i++) {
        objekts.pievienot(dabutVertibu(), false);
    }
    this.zimet = function(attels, ramis, teksts, linija) {
    };
    return this;
};

Strukturas[c++].izveidot = function(elementi) {
    this.struktura = null;
    var objekts = this;
    this.elements = function(vertiba) {
        this.vertiba = vertiba;
        this.zimejums = [];
        this.kreisais = null;
        this.labais = null;
    };
    this.pievienot = function(vertiba, sakuma) {
    };
    this.zimet = function(attels, ramis, teksts, linija) {
    };
    return this;
};

export default Strukturas;
