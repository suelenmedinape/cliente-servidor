export function calculandoAsRaizesDaExpressao(valorInputExpressao) {
    let intervaloIni = null;
    let intervaloFim = null;

    for (let i = -100; i < 100; i++) {
        let expressao1 = valorInputExpressao.replace(/\^/g, '**').replace(/x/g, `(${i})`);
        let calc1 = eval(expressao1);

        let expressao2 = valorInputExpressao.replace(/\^/g, '**').replace(/x/g, `(${i + 1})`);
        let calc2 = eval(expressao2);

        if (Math.sign(calc1) !== Math.sign(calc2)) {
            intervaloIni = i;
            intervaloFim = i + 1;
            break; 
        }
    }

    if (intervaloFim !== null && intervaloIni !== null) {
        return { intervaloIni, intervaloFim };
    }

    return 'Intervalos não encontrados';
}