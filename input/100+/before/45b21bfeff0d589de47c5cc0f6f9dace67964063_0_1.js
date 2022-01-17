function() {
    var component, components, _i, _len;
    components = [];
    components.push(new Component({
      id: 'leak',
      name: 'Refrigerant Leak',
      category: 'ac-lines',
      href: '#ac-lines-modal'
    }));
    components.push(new Component({
      id: 'compressor',
      name: 'Compressor',
      category: 'compressor',
      description: {
        'en-US': '<li>Heart of A/C System</li><li>Proper OE Lubricant is Important</li><li>#1 Cause of failure is lack of lubrication</li>',
        'es-ES': '<li>Corazón de un sistema A/C</li><li>Lubricante adecuado OE es Importante</li><li>#1 causa del fracaso es la falta de lubricación</li>',
        'fr-FR': '<li>Coeur d\'un système A/C</li><li>Lubrifiant approprié OE est importante</li><li>N°1 Cause de l\'échec est un manque de lubrification</li>',
        'it-IT': '<li>Cuore di un sistema A/C</li><li>OE lubrificante adeguato è importante</li><li>N°1 Causa del fallimento è la mancanza di lubrificazione</li>',
        'ja': '<li>A / Cシステムの·ハート</li><li>適切なOEの潤滑が重要である</li><li>障害が発生した·＃1原因は、潤滑の欠如である</li>',
        'zh-CN': '<li>A / C系统的心脏</li><li>正确的OE润滑油是重要的</li><li>＃1失败的原因是缺乏润滑</li>',
        'de-DE': '<li>Herz der Klimaanlage</li><li>Richtiger OE Schmierstoff ist wichtig</li><li># 1 Ursache des Fehlers ist der Mangel an Schmierung</li>',
        'pt-PT': '<li>Coração de um sistema A/C</li><li>Lubrificante OE adequada é importante</li><li>Causa # 1 de fracasso é a falta de lubrificação</li>'
      }
    }));
    components.push(new Component({
      id: 'accumulator',
      name: 'Accumulator / Receiver Dryer',
      category: 'accumulator',
      description: {
        'en-US': '<li>Contains Desiccant Crystals</li><li>Absorbs Moisture from System</li><li>Should be replaced whenever system is opened</li>',
        'es-ES': '<li>Contiene cristales desecantes</li><li>Absorbe la humedad del Sistema de</li><li>En caso de ser sustituido siempre que el sistema se abre</li>',
        'fr-FR': '<li>Contient des cristaux déshydratants</li><li>Absorbe l\'humidité de système</li><li>Doit être remplacé dès que le système est ouvert</li>',
        'it-IT': '<li>Contiene Cristalli essiccanti</li><li>Assorbe l\'umidità dal sistema</li><li>Deve essere sostituito ogni volta di aprire gli impianti</li>',
        'ja': '<li>デシカント結晶が含まれています</li><li>システムからの湿気を吸収</li><li>システムが開かれるたびに··交換するべき</li>',
        'zh-CN': '<li>包含干燥剂晶体</li><li>从系统中吸收水分</li><li>被打开时，系统应更换</li>',
        'de-DE': '<li>Trockenmittel enthält Kristalle</li><li>Nimmt Feuchtigkeit aus dem System</li><li>Sollten ersetzt, wenn Anlage geöffnet werden</li>',
        'pt-PT': '<li>Contém Cristais de dessecante</li><li>Absorve a umidade do Sistema</li><li>Deve ser substituído sempre que sistema é aberto</li>'
      }
    }));
    components.push(new Component({
      id: 'evaporator',
      name: 'Evaporator',
      category: 'evaporator',
      description: {
        'en-US': '<li>Removes heat from vehicle cabin</li><li>Blows cold air into vehicle cabin</li><li>Can be expensive to replace</li>',
        'es-ES': '<li>Elimina el calor de la cabina del vehículo</li><li>Los golpes de aire frío en la cabina del vehículo</li><li>Puede ser costoso para sustituir</li>',
        'fr-FR': '<li>Supprime la chaleur de la cabine du véhicule</li><li>Souffle de l\'air froid dans la cabine du véhicule</li><li>Peut être coûteux à remplacer</li>',
        'it-IT': '<li>Rimuove il calore dalla cabina del veicolo</li><li>Blows aria fredda nella cabina del veicolo</li><li>Può essere costose da sostituire</li>',
        'ja': '<li>車室内から··削除します。熱</li><li>車室内に·吹く冷たい空気</li><li>交換する高価なことができます</li>',
        'zh-CN': '<li>移除热量从车辆舱</li><li>吹冷空气进入汽车舱</li><li>可取代价格昂贵</li>',
        'de-DE': '<li>Entfernt von Wärme aus Fahrzeugkabine</li><li>Bläst kalte Luft in die Fahrzeugkabine</li><li>Kann teuer zu ersetzen</li>',
        'pt-PT': '<li>Retira o calor da cabine do veículo</li><li>Sopra ar frio na cabine do veículo</li><li>Pode ser caro para substituir</li>'
      }
    }));
    components.push(new Component({
      id: 'high-pressure-lines',
      name: 'A/C Lines',
      category: 'lines',
      href: '#ac-lines-modal',
      description: {
        'en-US': '<li>High Pressure Lines</li><li>High Side In-line filter can reduce compressor comebacks</li>',
        'es-ES': '<li>Las líneas de alta presión</li><li>Alto secundarios filtro en la vía puede reducir regresos de compresores</li>',
        'fr-FR': '<li>Lignes haute pression</li><li>Secondaires en ligne haute du filtre peut réduire retours compresseur</li>',
        'it-IT': '<li>Linee alta pressione</li><li>High Side filtro in linea in grado di ridurre rimonte compressore</li>',
        'ja': '<li>高圧、低圧線</li><li>ハイサイドのインラインフィルタは、圧縮機のカムバックを減らすことができます</li>',
        'zh-CN': '<li>高低压线路</li><li>高侧线滤波器可以减少压缩机的回击</li>',
        'de-DE': '<li>Hochdruckleitungen</li><li>High-Side-In-Line-Filter reduzieren kann Kompressor Comebacks</li>',
        'pt-PT': '<li>Alta linhas de pressão</li><li>Secundários alta filtro em linha de pode reduzir comebacks compressor</li>'
      },
      shown: false
    }));
    components.push(new Component({
      id: 'ac-lines',
      name: 'A/C Lines',
      category: 'ac-lines',
      description: {
        'en-US': '<li>Low Pressure Lines</li><li>High Side In-line filter can reduce compressor comebacks</li>',
        'es-ES': '<li>Las líneas de baja presión</li><li>Alto secundarios filtro en la vía puede reducir regresos de compresores</li>',
        'fr-FR': '<li>Lignes basse pression</li><li>Secondaires en ligne haute du filtre peut réduire retours compresseur</li>',
        'it-IT': '<li>Linee bassa pressione</li><li>High Side filtro in linea in grado di ridurre rimonte compressore</li>',
        'ja': '<li>高圧、低圧線</li><li>ハイサイドのインラインフィルタは、圧縮機のカムバックを減らすことができます</li>',
        'zh-CN': '<li>高低压线路</li><li>高侧线滤波器可以减少压缩机的回击</li>',
        'de-DE': '<li>Niederdruckleitungen</li><li>High-Side-In-Line-Filter reduzieren kann Kompressor Comebacks</li>',
        'pt-PT': '<li>Baixa linhas de pressão</li><li>Secundários alta filtro em linha de pode reduzir comebacks compressor</li>'
      }
    }));
    components.push(new Component({
      id: 'condenser',
      name: 'Condenser',
      category: 'condenser',
      description: {
        'en-US': '<li>Operates under high pressure</li><li>Converts Refrigerant from a Gas to a liquid</li><li>Dispenses latent heat from system into the atmosphere</li>',
        'es-ES': '<li>Funciona a alta presión</li><li>Convierte refrigerante de un gas en un líquido</li><li>Distribuye el calor latente del sistema a la atmósfera</li>',
        'fr-FR': '<li>Fonctionne sous haute pression</li><li>Convertit réfrigérant à partir d\'un gaz à un liquide</li><li>Distribue la chaleur latente du système dans l\'atmosphère</li>',
        'it-IT': '<li>Funziona ad alta pressione</li><li>Converte refrigerante da gas a liquido</li><li>Eroga calore latente dal sistema in atmosfera</li>',
        'ja': '<li>高圧下で動作</li><li>液体にガスから冷媒に変換</li><li>大気中にシステムからの潜熱を分配</li>',
        'zh-CN': '<li>高压下运作</li><li>转换成气体的制冷剂液体</li><li>从系统分配到大气中的潜热</li>',
        'de-DE': '<li>Betrieb unter hohem Druck</li><li>Wandelt Kältemittel aus einem gasförmigen in den flüssigen</li><li>Dosiert latente Wärme aus dem System in die Atmosphäre</li>',
        'pt-PT': '<li>Opera sob alta pressão</li><li>Converte refrigerante a partir de um gás em um líquido</li><li>Dispensa de calor latente do sistema para a atmosfera</li>'
      }
    }));
    components.push(new Component({
      id: 'refrigerant',
      name: 'Refrigerant',
      category: 'refrigerant',
      description: {
        'en-US': '<li>Installed through Low Pressure Port</li>',
        'es-ES': '<li>Instalación a través del puerto de baja presión</li>',
        'fr-FR': '<li>Installation à Port basse pression</li>',
        'it-IT': '<li>Installato tramite un\'uscita di Bassa Pressione</li>',
        'ja': '<li>低圧力ポートを介してインストール</li>',
        'zh-CN': '<li>通过安装低压端口</li>',
        'de-DE': '<li>Durch Niederdruck-Port installiert</li>',
        'pt-PT': '<li>Instalado através da Porta Baixa Pressão</li>'
      }
    }));
    components.push(new Component({
      id: 'orifice-tube-txv',
      name: 'Orifice / TXV',
      category: 'orifice-tube-txv',
      description: {
        'en-US': '<li>Converts System from High to Low Pressure</li><li>Meters flow of refrigerant into Evaporator</li>',
        'es-ES': '<li>Convierte Sistema de Alta Presión a la baja</li><li>Medidores de flujo de refrigerante en el evaporador</li>',
        'fr-FR': '<li>Convertit système de haute pression au plus bas</li><li>Débitmètres de fluide frigorigène dans l\'évaporateur</li>',
        'it-IT': '<li>Converte sistema da pressione alto al più basso</li><li>Flussometri di refrigerante in evaporatore</li>',
        'ja': '<li>低に高圧からシステムを変換します。</li><li>蒸発器に冷媒·メータの流れ</li>',
        'zh-CN': '<li>转换从高至低压力系统</li><li>仪表进入蒸发的制冷剂流量</li>',
        'de-DE': '<li>Wandelt System von hohem auf niedrigen Druck</li><li>Reguliert Strömung des Kältemittels in den Verdampfer</li>',
        'pt-PT': '<li>Converte Sistema de Alta Pressão para Baixo</li><li>Medidores de fluxo de refrigerante em evaporador</li>'
      }
    }));
    for (_i = 0, _len = components.length; _i < _len; _i++) {
      component = components[_i];
      component.save();
    }
    kb.locale_change_observable = kb.triggeredObservable(kb.locale_manager, 'change');
    window.app = {
      viewmodels: {},
      collections: {}
    };
    app.collections.components = new Components();
    app.viewmodels.components = new ComponentsViewModel(app.collections.components);
    app.viewmodels.settings = new SettingsViewModel(kb.locale_manager.getLocales());
    ko.applyBindings(app.viewmodels, $('body')[0]);
    app.collections.components.fetch();
    kb.locale_manager.setLocale('en-US');
    app.router = new AppRouter();
    Backbone.history.start();
    if (localStorage.getItem('visited') === null) {
      localStorage.setItem('visited', true);
      return _.delay((function() {
        return app.router.sync();
      }), 10000);
    }
  }