-- Insert into Formularios
INSERT INTO Formularios (nombre, descripcion)
VALUES ('Formulario de Inscripción', 'Formulario para inscribirse en el programa.');

-- Insert into Recursos_Adicionales
INSERT INTO Recursos_Adicionales (nombre, descripcion, URL, imagen, idFormulario)
Values('CONAPDIS', 'El Conapdis es el rector en discapacidad, responsable de promover y fiscalizar el cumplimiento de los derechos humanos de la población con discapacidad, para fomentar su desarrollo inclusivo en todos los ámbitos de la sociedad.', 'https://conapdis.go.cr', '../assets/CONAPDIS.png', 2),
('Wheelmap', 'Wheelmap es una plataforma en línea que permite a los usuarios encontrar y compartir información sobre la accesibilidad de lugares en todo el mundo.', 'https://wheelmap.org', '../assets/WheelMap.png', 2),
('Blog de Apps para Personas con Discapacidad', 'Blog que ofrece información sobre aplicaciones móviles y tecnología accesible para personas con discapacidad.', 'https://gaptain.com/blog/18-herramientas-digitales-para-personas-con-discapacidad/', '../assets/18.png', 2);

-- Insert into Informacion
-- INSERT INTO Informacion (tipo, titulo, descripcion)
-- VALUES ('General', 'Introducción al Programa', 'Un documento introductorio sobre el programa.');
INSERT INTO Informacion (tipo,titulo,descripcion) VALUES (1,'¿Qué es','La Comisión de Equiparación de Oportunidades es el órgano oficial del Instituto Tecnológico de Costa Rica que se encarga de promover y garantizar la inclusión y la igualdad de oportunidades para las personas con discapacidad en la institución.');

INSERT INTO Informacion (tipo,titulo,descripcion, nombreRecurso, linkRecurso, descripcionRecurso) VALUES (2,'Funcionalidades','Velar por el cumplimiento de lo estipulado en la Ley de Igualdad de Oportunidades para las Personas con Discapacidad, Ley No. 7600 y su reglamento. Ingrese al siguiente enlace si desea saber más información sobre leyes.','información sobre leyes.','/leyes','Enlace que le redirige a la sección de normas');
INSERT INTO Informacion (tipo,titulo,descripcion) VALUES (2,'Funcionalidades','Promover en la Comunidad Institucional el desarrollo de mayores niveles de sensibilización y concientización sobre los Derechos Humanos y la Discapacidad.');

INSERT INTO Informacion (tipo,titulo,descripcion, nombreRecurso, linkRecurso, descripcionRecurso) VALUES (3,'Servicios','Acompañamiento y asesoría psicoeducativa individual y grupal para estudiantes con necesidades educativas y en condición de discapacidad.','','../assets/servicios1.png','Se muestra dos personas hablando. Una persona está sentada frente a un escritorio y la otra está en una silla de ruedas.');
INSERT INTO Informacion (tipo,titulo,descripcion, nombreRecurso, linkRecurso, descripcionRecurso) VALUES (3,'Servicios','Gestión de ajustes y apoyos educativos para el aprendizaje según las necesidades de cada estudiante.','','../assets/servicios2.png','Se muestra una persona en silla de ruedas frente a un escritorio.');
INSERT INTO Informacion (tipo,titulo,descripcion, nombreRecurso, linkRecurso, descripcionRecurso) VALUES (3,'Servicios','Gestión de acciones y articulación con otras instancias y programas que permitan la revisión, definición y actualización de acciones para el cumplimiento de los derechos de la población estudiantil con necesidades educativas y en condición de discapacidad.','','../assets/servicios3.png','Se muestran cuatro manos levantadas.');
INSERT INTO Informacion (tipo,titulo,descripcion, nombreRecurso, linkRecurso, descripcionRecurso) VALUES (3,'Servicios','Asesoría en el tema de apoyos educativos, discapacidad y necesidades educativas a docentes, estudiantes u otras instancias que lo requieran.','','../assets/servicios4.png','Se muestra una clase, hay un profesor señalando algo en un pizarra frente a un grupo de personas.');

INSERT INTO Informacion (tipo,titulo,descripcion) VALUES (4,'Integrantes','La siguiente tabla contiene los datos de los integrantes de la comisión:');

-- info de normas
INSERT INTO Informacion (tipo,titulo,descripcion) VALUES (5,'Ley de Igualdad de Oportunidades para las Personas con Discapacidad, Ley No. 7600',
'Como parte de los objetivos de la comisión está el velar por el cumplimiento de lo estipulado en la Ley de Igualdad de Oportunidades 
para las Personas con Discapacidad, Ley No. 7600 y su reglamento.<br/>La Ley No. 7600 de Costa Rica, tiene como objetivo garantizar la igualdad de oportunidades
y la no discriminación para las personas con discapacidad. La ley define discapacidad e incluye medidas para eliminar barreras arquitectónicas y de comunicación,
asegurar el acceso a una educación inclusiva y promover la igualdad de oportunidades en el ámbito laboral. Además, establece la obligación de proporcionar
servicios de apoyo y servicios médicos, psicológicos, educativos y de rehabilitación.');
INSERT INTO Informacion (tipo,titulo,descripcion, nombreRecurso, linkRecurso, descripcionRecurso) VALUES (5,'Reglamento de la Ley de Igualdad de Oportunidades para Personas con Discapacidad',
'La Ley No. 7600 de Costa Rica incluye disposiciones que garantizan la igualdad de oportunidades y la no discriminación para las
personas con discapacidad en áreas como educación, empleo, salud, transporte y accesibilidad en general.
Visite el siguiente link si desea saber más de la ', 'ley No. 7600.', 'https://www.asamblea.go.cr/sd/SiteAssets/Lists/Consultas%20Biblioteca/EditForm/Ley%207600.pdf',
'Enlace a documento pdf que especifica los artículos de la Ley 7600 (se abre en una pestaña nueva)');
INSERT INTO Informacion (tipo,titulo,descripcion, nombreRecurso, linkRecurso, descripcionRecurso) VALUES (5,'Ley de Igualdad de Oportunidades para las Personas con Discapacidad',
'El Reglamento de la Ley N° 7600 establece directrices específicas para implementar las disposiciones de la ley,
detallando cómo las instituciones deben garantizar la accesibilidad, igualdad de oportunidades y derechos para
las personas con discapacidad en áreas como transporte, educación, salud y empleo.
Visite el siguiente link si desea saber más del ', 'reglamento de la ley No. 7600.', 'http://www.pgrweb.go.cr/scij/Busqueda/Normativa/Normas/nrm_texto_completo.aspx?param1=NRTC&nValor1=1&nValor2=53160&nValor3=91140&strTipM=TC',
'Enlace a página del Sistema Costarricense de información Jurídica que explica el reglamento de la Ley 7600 (se abre en una pestaña nueva)');


-- Insert into Noticias
INSERT INTO Noticias (fecha,titulo,linkImagen, descripcionImagen,linkNoticia, descripcionNoticia) VALUES ('27 de Noviembre 2023',
'“Siempre van a existir las posibilidades y no hay límites"', 'https://www.tec.ac.cr/hoyeneltec/sites/default/files/styles/node/public/media/img/main/017_ceremonia-graduacion-estudiantes-tec_24_11_2023_paquesada.jpg',
'Se muestra fotografía de estudiante graduada. Está frente a un podio, tiene una toga y un birrete puesto.', 'https://www.tec.ac.cr/hoyeneltec/2023/11/27/siempre-van-existir-posibilidades-no-hay-limites',
'Enlace a noticia "Siempre van a existir las posibilidades y no hay límites" (se abre en una pestaña nueva)');

INSERT INTO Noticias (fecha,titulo,linkImagen, descripcionImagen,linkNoticia, descripcionNoticia) VALUES ('02 de Noviembre 2022',
'Expertos internacionales en accesibilidad e inclusión se reunieron en Costa Rica', 'https://www.tec.ac.cr/hoyeneltec/sites/default/files/styles/node/public/media/img/main/access_2022_rgarita-16.jpg',
'Se muestran 5 personas con una vestimenta formal. Dos de ellos sostienen un bastón de orientación, y uno de ellos usa una silla de ruedas.', 
'https://www.tec.ac.cr/hoyeneltec/2022/11/02/expertos-internacionales-accesibilidad-inclusion-se-reunieron-costa-rica',
'Enlace a noticia "Expertos internacionales en accesibilidad e inclusión se reunieron en Costa Rica" (se abre en una pestaña nueva)');

INSERT INTO Noticias (fecha,titulo,linkImagen, descripcionImagen,linkNoticia, descripcionNoticia) VALUES ('20 de Julio 2022',
'El TEC atiende permanentemente las necesidades educativas específicas de las personas con discapacidad', 'https://www.tec.ac.cr/hoyeneltec/sites/default/files/styles/node/public/media/img/main/infraestructura_sede_cartago_accesibilidad_acera_con_superficie_de_guia_3.jpg',
'Se muestra una fotografía de unas baldosas podotáctiles colocadas en la acera.', 
'https://www.tec.ac.cr/hoyeneltec/2022/07/20/tec-atiende-permanentemente-necesidades-educativas-especificas-personas-discapacidad',
'Enlace a noticia "El TEC atiende permanentemente las necesidades educativas específicas de las personas con discapacidad" (se abre en una pestaña nueva)');


-- Insert into Preguntas
INSERT INTO Preguntas (pregunta, idFormulario, tipoRespuesta, opcionesRespuesta) VALUES
('Nombre', 2, 2, NULL),
('Correo', 2, 2, NULL),
('Cedula', 2, 2, NULL),
('Cuéntanos sobre el servicio o la ayuda que deseas recibir.', 2, 2, NULL),
('Indique los dias y las horas en los que le sea mas facil asistir a la reunion.', 2, 3, NULL),
('Seleccione la sede', 2, 3, 'Sede A, Sede B, Sede C'),
('Carrera', 2, 2, NULL),
('Fecha', 2, 3, NULL),
('Carne', 2, 2, NULL),
('Rol', 2, 3, 'Estudiante, Docente, Administrativo, Otro'),
('Recibió servicios y apoyo del Programa de Admisión Accesible para estudiantes con Discapacidad y Necesidades Educativas', 2, 1, 'Si, No'),
('Forma parte del Programa de Servicios para estudiantes con Discapacidad y Necesidades Educativas', 2, 1, 'Si, No'),
('Area de la denuncia', 2, 3, NULL),
('Motivo', 2, 2, NULL),
('Descripción de los aspectos o situación por denunciar', 2, 2, NULL),
('Dependencia',2,2,NULL),
('Recibió servicios y apoyo del Programa Institucional de Equiparación de Oportunidades para Personas con Discapacidad del ITCR',2,1,'Si, No'),
('Acompañamiento',2,3,'Clínica de Atención Integral en Salud (CAIS), Comisión Institucional de Salud Ocupacional (CISO), Caja Costarricense de Seguro Social, Instituto Nacional de Seguros, Otro');

-- Insert into Miembros
INSERT INTO Miembros (nombre, sede, email, telefono)
VALUES ('Paula Cubillo Segura', 'Cartago', 'pcubillo@tec.ac.cr', '2550-2784');

INSERT INTO Miembros (nombre, sede, email, telefono)
VALUES ('Ericka Solano', 'San José', 'es@tec.ac.cr', '2555-4781');


-- Insert into FormulariosRecibidos
INSERT INTO FormulariosRecibidos (tipoUsuario, idUsuario, resouestas, email, sede, fecha, idFormulario, idEncargado)
VALUES ('Estudiante', 123, 'Respuesta a la pregunta 1', 'estudiante@example.com', 'Sede Central', '2024-10-05', 1, 1);
