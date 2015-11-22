
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
    this.iegutElementu = function(sakuma) {
        if (sakuma) {
            return objekts.struktura;
        } else {
            var elem = objekts.struktura;
            while (elem.nakosais) {
                elem = elem.nakosais;
            }
            return elem;
        }
    };
    this.pievienot = function(vertiba, sakuma) {
        if (objekts.struktura) {
            var elem = objekts.iegutElementu(sakuma);
            elem.nakosais = new objekts.elements(vertiba);
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
    this.iegutElementu = function(sakuma) {
        if (sakuma) {
            return objekts.struktura;
        } else {
            var elem = objekts.struktura;
            while (elem.nakosais) {
                elem = elem.nakosais;
            }
            return elem;
        }
    };
    this.pievienot = function(vertiba, sakuma) {
        if (objekts.struktura) {
            var elem = objekts.iegutElementu(sakuma);
            elem.nakosais = new objekts.elements(vertiba);
            elem.nakosais.ieprieksejais = elem;
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
            while (idx > 0 && elem.vertiba > objekts.struktura[virsas_idx].vertiba) {
                var tmp = elem.vertiba;
                elem.vertiba = objekts.struktura[virsas_idx].vertiba;
                objekts.struktura[virsas_idx].vertiba = tmp;
                elem = objekts.struktura[virsas_idx];
                idx = Math.floor((idx - 1) / 2);
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
    this.pievienot = function(vertiba, sakuma) {
    };
    this.zimet = function(attels, ramis, teksts, linija) {
    };
    return this;
};

Strukturas[c++].izveidot = function(elementi) {
    this.struktura = null;
    this.pievienot = function(vertiba, sakuma) {
    };
    this.zimet = function(attels, ramis, teksts, linija) {
    };
    return this;
};

Strukturas[c++].izveidot = function(elementi) {
    this.struktura = null;
    this.pievienot = function(vertiba, sakuma) {
    };
    this.zimet = function(attels, ramis, teksts, linija) {
    };
    return this;
};

export default Strukturas;
