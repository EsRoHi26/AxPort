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

INSERT INTO Informacion (tipo,titulo,descripcion, linkRecurso, descripcionRecurso) VALUES (5,'27 de Noviembre 2023',
'“Siempre van a existir las posibilidades y no hay límites"', '');



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
