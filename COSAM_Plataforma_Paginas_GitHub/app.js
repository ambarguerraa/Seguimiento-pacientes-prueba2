/* Plataforma COSAM — PROTOTIPO DE NAVEGACIÓN. No hay autenticación ni servidor. */
(() => {
  'use strict';
  const T = window.COSAM_TEXTOS || {};
  const page = document.body.dataset.page;
  const app = document.querySelector('#app');
  const demoNote = 'Prototipo visual. Los registros, estados y cifras son ilustrativos; esta página no gestiona datos clínicos reales.';
  const patients = [
    {code:'P-024', title:'Paciente 024', cesfam:'CESFAM X', status:'Revisión pendiente', statusClass:'pending', days:'74 Días'},
    {code:'P-051', title:'Paciente 051', cesfam:'CESFAM X', status:'Alerta activa', statusClass:'alert', days:''}
  ];
  const alerts = [
    {code:'P-051', when:'Hoy · 14:32', severity:'URGENTE', severityClass:'urgent', title:'Solicitud directa de ayuda', description:'Requiere aplicar el protocolo clínico correspondiente.'},
    {code:'P-083', when:'Ayer · 18:40', severity:'PRIORITARIO', severityClass:'priority', title:'Aumento de episodios registrados', description:'Revisar informe.'}
  ];
  function byPath(path) {
    return path.split('.').reduce((v,k)=>v && v[k],T);
  }
  function replaceTexts() {
    document.querySelectorAll('[data-text]').forEach(el=>{
      const value = byPath(el.dataset.text);
      if (typeof value === 'string') el.textContent=value;
    });
  }
  const strokes = {
    menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',
    grid:'<rect x="3.5" y="3.5" width="7" height="7" rx=".7"/><rect x="13.5" y="3.5" width="7" height="7" rx=".7"/><rect x="3.5" y="13.5" width="7" height="7" rx=".7"/><rect x="13.5" y="13.5" width="7" height="7" rx=".7"/>',
    people:'<circle cx="12" cy="6" r="3.5"/><circle cx="4.5" cy="8" r="2.5"/><circle cx="19.5" cy="8" r="2.5"/><path d="M6 21v-4a6 6 0 0112 0v4H6Zm-2 0H2v-6a4 4 0 013-3.6M20 21h2v-6a4 4 0 00-3-3.6"/>',
    bell:'<path d="M18 9a6 6 0 00-12 0v3c0 2-1 3-2.5 4h17C19 15 18 14 18 12V9ZM10 20a2 2 0 004 0M2 8c-1 2-1 6 0 8M22 8c1 2 1 6 0 8"/>',
    clipboard:'<rect x="5" y="4" width="14" height="18" rx="1.8"/><path d="M9 4.5V2h6v2.5M9 11l2 2 4-4"/>',
    report:'<path d="M3 21V11h4v10M10 21V6h4v15M17 21V2h4v19M2 22h20"/>',
    link:'<path d="M9.5 14.5l5-5M8 17l-1.5 1.5a4 4 0 01-5.6-5.6l4.6-4.6a4 4 0 015.7 0M16 7l1.5-1.5a4 4 0 015.6 5.6l-4.6 4.6a4 4 0 01-5.7 0"/>',
    user:'<circle cx="12" cy="12" r="10"/><circle cx="12" cy="9" r="3.5"/><path d="M5.5 20a7 7 0 0113 0"/>',
    search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
    chevron:'<path d="m9 18 6-6-6-6"/>',
    close:'<path d="M5 5l14 14M19 5 5 19"/>',
    warning:'<circle cx="12" cy="12" r="9"/><path d="M12 7v6m0 4h.01"/>',
    clock:'<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/>',
    device:'<path d="M8 3h8l3 6v8l-4 4H9l-4-4V9l3-6ZM8 9h8M9 16h6"/>',
    personCheck:'<circle cx="9" cy="7" r="3"/><path d="M2 20v-4a7 7 0 0112-4"/><circle cx="17" cy="17" r="5"/><path d="m14.5 17 1.7 1.7 3.4-3.5"/>',
    back:'<path d="m14 18-6-6 6-6"/>'
  };
  function icon(name, className='icon') {
    return `<svg class="${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${strokes[name] || strokes.grid}</svg>`;
  }
  function menuItem(name,label,href,ic,active) {
    return `<a href="${href}" class="side-item ${active?'is-active':''}" ${active?'aria-current="page"':''}>${icon(ic)}<span>${label}</span></a>`;
  }
  function shell(section,body) {
    const p=T.plataforma || {};
    const navs=[
      ['panel',p.inicio||'Inicio','panel.html','grid'],
      ['pacientes',p.pacientes||'Pacientes','pacientes.html','people'],
      ['alertas',p.alertas||'Alertas','alertas.html','bell'],
      ['seguimiento',p.seguimiento||'Seguimiento','seguimiento.html','clipboard'],
      ['informes',p.informes||'Informes','informes.html','report']
    ];
    const mainSection=(section==='ficha'?'pacientes':section);
    const topIcon = section==='panel' ? '' : section==='pacientes'||section==='ficha' ? icon('people','top-icon') : section==='alertas' ? icon('bell','top-icon') : section==='seguimiento' ? icon('clipboard','top-icon') : icon('report','top-icon');
    const topTitle = section==='panel' ? `<span class="top-heading"><strong>Seguimiento</strong> pacientes en lista de espera</span>` : topIcon;
    return `<div class="platform" id="platform">
      <header class="platform-header">
        <button class="menu-toggle icon-button" id="menuToggle" aria-label="Mostrar u ocultar menú" aria-expanded="true">${icon('menu')}</button>
        <div class="header-center" aria-label="${p.cabecera||'Seguimiento pacientes en lista de espera'}">${topTitle}</div>
        <button class="profile-toggle icon-button" data-dialog="profile" aria-label="Perfil profesional">${icon('user')}</button>
      </header>
      <aside class="sidebar" id="sidebar"><h2>${p.menu||'Menú'}</h2><nav aria-label="Menú principal">${navs.map(v=>menuItem(v[0],v[1],v[2],v[3],v[0]===mainSection)).join('')}</nav></aside>
      <main class="platform-main">${body}</main>
    </div>
    <div id="notification" class="toast" aria-live="polite"></div>
    <dialog id="cosamModal" class="cosam-dialog"><div id="dialogContent"></div><button type="button" class="dialog-close" id="closeDialog" aria-label="Cerrar ventana">${icon('close')}</button></dialog>`;
  }
  function login() {
    const a=T.acceso||{};
    return `<main class="login-layout">
      <section class="login-form-section">
        <div class="login-form-inner">
          <h1>${a.titulo||'Bienvenido/a'}</h1>
          <p class="login-description">${a.subtitulo||''}</p>
          <form id="accessForm" autocomplete="off">
            <label class="sr-only" for="email">${a.correo||'Correo institucional'}</label>
            <input id="email" type="email" placeholder="${a.correo||'CORREO INSTITUCIONAL'}" autocomplete="off" aria-describedby="demo-warning">
            <label class="sr-only" for="password">${a.clave||'Contraseña'}</label>
            <input id="password" type="password" placeholder="${a.clave||'CONTRASEÑA'}" autocomplete="off" aria-describedby="demo-warning">
            <div class="login-options"><label><input type="checkbox" id="remember"> ${a.recordar||'Recordarme'}</label><button type="button" class="text-link" data-dialog="forgot">${a.olvido||'¿Olvidaste tu contraseña?'}</button></div>
            <button class="register-btn" type="submit">${a.boton||'REGISTRARSE'}</button>
          </form>
          <p id="demo-warning" class="demo-warning">Acceso de demostración, sin autenticación real. No ingreses datos ni contraseñas reales.</p>
          <a class="return-link" href="index.html">${icon('back')} Volver al inicio</a>
        </div>
      </section>
      <div class="login-art" role="img" aria-label="Composición azul y turquesa con el logotipo de La Reina"></div>
    </main>
    <dialog id="cosamModal" class="cosam-dialog"><div id="dialogContent"></div><button type="button" class="dialog-close" id="closeDialog" aria-label="Cerrar ventana">${icon('close')}</button></dialog>`;
  }
  function dashboard() {
    const stats=[['128','En espera','people','pacientes.html'],['07','Por revisar','bell','alertas.html'],['04','Pendientes','clipboard','seguimiento.html'],['03','Sin conexión','link','seguimiento.html']];
    return `<section class="dashboard-content">
      <h1 class="section-title">${T.plataforma?.panel||'Panel general'}</h1>
      <div class="dashboard-stats">${stats.map(([value,label,ic,link])=>`<a class="stat-tile" href="${link}" aria-label="${value} ${label}">${icon(ic,'stat-icon')}<strong>${value}</strong><span>${label}</span></a>`).join('')}</div>
      <section class="recent-alerts" aria-labelledby="recentHeading"><h2 id="recentHeading">Alertas recientes</h2>
        <a class="recent-row" href="alertas.html">${icon('warning','recent-symbol urgent-icon')}<span><strong>P-024</strong><small>Episodios repetidos</small></span></a>
        <a class="recent-row" href="alertas.html">${icon('clock','recent-symbol')}<span><strong>P-083</strong><small>Seguimiento pendiente</small></span></a>
      </section>
    </section>`;
  }
  function patientItem(p) {
    return `<a class="patient-card" href="ficha.html?id=${encodeURIComponent(p.code)}" data-name="${p.title.toLowerCase()} ${p.code.toLowerCase()} ${p.cesfam.toLowerCase()}" data-cesfam="${p.cesfam}" data-status="${p.status}">
      <div><strong>${p.title}</strong><small>${p.code} &nbsp; ${p.cesfam}</small></div>
      ${icon('chevron','patient-arrow')}
      <div class="patient-footer"><span>${p.days}</span><span class="patient-status ${p.statusClass}">${p.status.toUpperCase()}</span></div>
    </a>`;
  }
  function patientsPage() {
    return `<section class="patients-content">
      <h1 class="section-title">Pacientes</h1><p class="section-subtitle">${T.pacientes?.subtitulo||''}</p>
      <div class="patient-stat-row"><div class="patient-stat"><span>Total en espera</span><strong>128</strong></div><div class="patient-stat"><span>Con seguimiento</span><strong>96</strong></div></div>
      <div class="search-field"><label class="sr-only" for="patientSearch">Buscar paciente</label><input id="patientSearch" type="search" placeholder="${T.pacientes?.buscador||'BUSCAR POR NOMBRE O CÓDIGO'}">${icon('search')}</div>
      <div class="patient-filters"><label><span class="sr-only">Filtrar por CESFAM</span><select id="filterCesfam"><option value="">CESFAM: todos</option><option value="CESFAM X">CESFAM X</option></select></label><label><span class="sr-only">Filtrar por estado</span><select id="filterStatus"><option value="">ESTADO: todos</option><option value="Revisión pendiente">Revisión pendiente</option><option value="Alerta activa">Alerta activa</option></select></label></div>
      <h2 class="list-heading">${T.pacientes?.lista||'Listado de pacientes'}</h2>
      <div id="patientList" class="patient-list">${patients.map(patientItem).join('')}</div><p id="patientEmpty" class="empty-filter" hidden>No se encontraron pacientes con esos filtros.</p>
    </section>`;
  }
  function patientDetail() {
    const id=new URLSearchParams(location.search).get('id')||'P-024';
    const p=patients.find(p=>p.code===id)||patients[0];
    const is24=p.code==='P-024';
    return `<section class="detail-content">
      <div class="breadcrumbs"><a href="pacientes.html">Pacientes</a> &gt; <span>Ficha del paciente</span></div>
      <div class="detail-columns">
        <section class="detail-left" aria-label="Identificación del paciente">
          <div class="profile-intro"><div class="profile-avatar" aria-hidden="true"><span></span></div><div><h1>${p.title}</h1><p>Nombre: ${is24?'Registro de demostración':'No disponible'}<br>Edad: ${is24?'21':'—'}<br>Rut: XX.XXX.XXX-X</p></div></div>
          <div class="patient-badges"><span class="pill-orange">${is24?'Revisión pendiente':'Alerta activa'}</span><span class="pill-grey">En lista de espera</span></div>
          <div class="small-info-card"><span>Tiempo en espera</span><strong>${is24?'74 días':'—'}</strong><small>Desde la derivación</small></div>
          <div class="small-info-card"><span>Último registro</span><strong>Hoy</strong><small>Fecha ilustrativa</small></div>
          <div class="professional">${icon('personCheck')}<div><strong>Profesional asignado</strong><small>Equipo de salud mental</small></div></div>
        </section>
        <section class="detail-right" aria-label="Contenido clínico de ejemplo">
          <div class="detail-tabs" role="tablist" aria-label="Ficha del paciente">
            <button class="tab is-selected" type="button" role="tab" id="tabResumen" data-tab="resumen" aria-controls="panelResumen" aria-selected="true">Resumen</button>
            <button class="tab" type="button" role="tab" id="tabEvolucion" data-tab="evolucion" aria-controls="panelEvolucion" aria-selected="false">Evolución</button>
            <button class="tab" type="button" role="tab" id="tabAlertas" data-tab="alertas" aria-controls="panelAlertas" aria-selected="false">Alertas</button>
          </div>
          <div class="tab-panel" role="tabpanel" id="panelResumen" aria-labelledby="tabResumen">
            <h2 class="detail-subheading">Resumen clínico y administrativo</h2>
            <div class="detail-purple-box"><h3>Datos de derivación</h3><div class="detail-facts"><span>Fecha de derivación</span><span>${is24?'09/08/2026':'No disponible'}</span><span>Origen</span><span>${p.cesfam}</span><span>Estado</span><span>En espera</span></div></div>
            <div class="detail-notes"><div><h3>Motivo de derivación</h3><p>Información clínica autorizada pendiente de completar en el sistema real.</p></div><div><h3>Antecedentes relevantes</h3><p>Consultar antecedentes registrados y validados por el equipo clínico.</p></div></div>
            <h3 class="devices-heading">Estado de los dispositivos</h3>
            <div class="device-row">${icon('device')}<div><strong>Pulsera de regulación</strong><small>Última sincronización: hoy</small></div><span class="connected">CONECTADA</span></div>
            <div class="device-row">${icon('device')}<div><strong>Objeto lumínico</strong><small>Último estado recibido: hoy</small></div><span class="connected">CONECTADO</span></div>
            <button class="data-button" data-dialog="devices" type="button">Ver datos recolectados</button>
          </div>
          <div class="tab-panel" role="tabpanel" id="panelEvolucion" aria-labelledby="tabEvolucion" hidden><h2 class="detail-subheading">Evolución</h2><div class="empty-tab">Esta maqueta no incluye registros clínicos de evolución. La vista se completará cuando se defina el sistema de información autorizado.</div></div>
          <div class="tab-panel" role="tabpanel" id="panelAlertas" aria-labelledby="tabAlertas" hidden><h2 class="detail-subheading">Alertas</h2><div class="detail-notes"><div><h3>${is24?'Episodios repetidos':'Alerta activa'}</h3><p>Consulta y gestión de alertas disponibles en la sección Alertas.</p><a href="alertas.html" class="inline-link">Ver alertas</a></div></div></div>
        </section>
      </div>
    </section>`;
  }
  function alertCard(a,i) {
    return `<article class="alert-card"><div class="alert-card-top"><div><p><strong class="${a.severityClass==='urgent'?'red-text':'orange-text'}">${a.code}</strong> · ${a.when}</p><h3>${a.title}</h3><p>${a.description}</p></div><span class="severity ${a.severityClass}">${a.severity}</span></div>
      <div class="alert-actions"><button type="button" class="view-alert" data-alert-index="${i}" data-dialog="alert">VER DETALLES</button><button type="button" class="manage-alert" data-alert-index="${i}" data-manage="${i}">GESTIONAR</button></div></article>`;
  }
  function alertsPage() {
    return `<section class="alerts-content"><h1 class="section-title">Alertas</h1><p class="section-subtitle">${T.alertas?.subtitulo||''}</p>
      <div class="alert-stats"><div><span>Nuevas</span><strong>02</strong></div><div><span>Asignadas</span><strong>05</strong></div><div><span>Pendientes</span><strong>03</strong></div></div>
      <h2 class="alerts-list-title">${T.alertas?.porRevisar||'Por revisar'}</h2>
      <div class="alerts-list">${alerts.map(alertCard).join('')}</div>
    </section>`;
  }
  function pendingSection(kind) {
    const n=kind==='seguimiento'?'Seguimiento':'Informes';
    return `<section class="pending-content"><h1 class="section-title">${n}</h1><div class="placeholder"><h2>Sección pendiente de diseño</h2><p>El video y el PDF muestran esta opción en el menú, pero no incluyen una pantalla desarrollada. Se conserva el espacio de navegación sin agregar contenido clínico inventado.</p><a href="panel.html" class="data-button return-panel">Volver al panel general</a></div></section>`;
  }
  function toast(msg) {
    const box=document.querySelector('#notification');
    if(!box)return;
    box.textContent=msg;box.classList.add('is-visible');
    clearTimeout(window.__cosamToast);
    window.__cosamToast=setTimeout(()=>box.classList.remove('is-visible'),5000);
  }
  function openDialog(key, index) {
    const d=document.querySelector('#cosamModal');
    const c=document.querySelector('#dialogContent');
    if(!d||!c)return;
    let head='',body='';
    if (key==='forgot') { head='Recuperación de contraseña'; body='En esta demostración no existe conexión con cuentas institucionales. La recuperación de contraseñas se habilitará únicamente con un sistema de autenticación seguro.'; }
    else if(key==='profile'){head='Perfil del personal médico';body='Área de perfil prevista para una versión con acceso institucional autenticado. No se muestran datos personales reales.';}
    else if(key==='devices'){head='Datos recolectados';body='Estado ilustrativo: pulsera de regulación conectada y objeto lumínico conectado. No hay registros biométricos ni datos clínicos reales conectados a este prototipo.';}
    else if(key==='alert') {let a=alerts[Number(index)]||alerts[0];head=`${a.code} · ${a.severity}`;body=`${a.title}. ${a.description} Esta es una vista demostrativa; no representa una alerta clínica real.`;}
    c.innerHTML=`<h2>${head}</h2><p>${body}</p><button type="button" class="dialog-accept" id="acceptDialog">Cerrar</button>`;
    d.showModal();
    document.querySelector('#acceptDialog').addEventListener('click',()=>d.close());
  }
  function initDialogs(){
    const d=document.querySelector('#cosamModal');
    if(!d)return;
    document.addEventListener('click',e=>{
      const trigger=e.target.closest('[data-dialog]');
      if(trigger)openDialog(trigger.dataset.dialog,trigger.dataset.alertIndex);
    });
    d.querySelector('#closeDialog').addEventListener('click',()=>d.close());
    d.addEventListener('click',e=>{if(e.target===d)d.close()});
  }
  function initShell() {
    const toggle=document.querySelector('#menuToggle');
    const platform=document.querySelector('#platform');
    if (window.matchMedia('(max-width:700px)').matches) {
      platform.classList.add('is-collapsed');
      toggle?.setAttribute('aria-expanded','false');
    }
    toggle?.addEventListener('click',()=>{
      const collapsed=platform.classList.toggle('is-collapsed');
      toggle.setAttribute('aria-expanded',String(!collapsed));
    });
  }
  function initFilters(){
    const input=document.querySelector('#patientSearch'),cent=document.querySelector('#filterCesfam'),stat=document.querySelector('#filterStatus');
    if(!input||!cent||!stat)return;
    const update=()=>{
      let shown=0;
      document.querySelectorAll('.patient-card').forEach(el=>{
        const visible=el.dataset.name.includes(input.value.trim().toLocaleLowerCase('es-CL'))&&(!cent.value||el.dataset.cesfam===cent.value)&&(!stat.value||el.dataset.status===stat.value);
        el.hidden=!visible;
        if(visible)shown++;
      });
      document.querySelector('#patientEmpty').hidden=shown>0;
    };
    [input,cent,stat].forEach(x=>x.addEventListener('input',update));
  }
  function initTabs(){
    const buttons=[...document.querySelectorAll('[data-tab]')];
    buttons.forEach(button=>button.addEventListener('click',()=>{
      buttons.forEach(b=>{
        const selected=b===button;
        b.setAttribute('aria-selected',String(selected));
        b.classList.toggle('is-selected',selected);
        document.querySelector('#panel'+b.dataset.tab[0].toUpperCase()+b.dataset.tab.slice(1)).hidden=!selected;
      });
    }));
  }
  function initAlerts(){
    document.querySelectorAll('[data-manage]').forEach(btn=>btn.addEventListener('click',()=>{
      toast('GESTIONAR: acción demostrativa. No se ha cambiado ningún registro clínico.');
    }));
  }
  function initVideo(){
    const v=document.querySelector('.aurora__video'); if(!v)return;
    const motion=matchMedia('(prefers-reduced-motion: reduce)');
    const run=()=>motion.matches?v.pause():v.play().catch(()=>{});
    run();motion.addEventListener('change',run);
  }
  function initLogin(){
    const f=document.querySelector('#accessForm');
    f?.addEventListener('submit',e=>{e.preventDefault(); f.reset(); window.location.href='panel.html';});
  }
  if(page==='inicio-publico') {
    replaceTexts();
    initVideo();
    if(T.pagina)document.title=T.pagina;
    return;
  }
  if(page==='login') { app.innerHTML=login();initLogin();initDialogs();return; }
  const pages={panel:dashboard,pacientes:patientsPage,ficha:patientDetail,alertas:alertsPage,seguimiento:()=>pendingSection('seguimiento'),informes:()=>pendingSection('informes')};
  if(!pages[page])return;
  app.innerHTML=shell(page,pages[page]());
  initShell();initDialogs();initFilters();initTabs();initAlerts();
})();
