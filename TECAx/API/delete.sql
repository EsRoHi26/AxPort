-- Insert into Formularios
INSERT INTO Formularios (nombre, descripcion)
VALUES ('Formulario de Inscripción', 'Formulario para inscribirse en el programa.');

-- Insert into Recursos_Adicionales
INSERT INTO Recursos_Adicionales (nombre, descripcion, URL, imagen, idFormulario)
Values('CONAPDIS', 'El Conapdis es el rector en discapacidad, responsable de promover y fiscalizar el cumplimiento de los derechos humanos de la población con discapacidad, para fomentar su desarrollo inclusivo en todos los ámbitos de la sociedad.', 'https://conapdis.go.cr', '../assets/CONAPDIS.png', 1),
('Wheelmap', 'Wheelmap es una plataforma en línea que permite a los usuarios encontrar y compartir información sobre la accesibilidad de lugares en todo el mundo.', 'https://wheelmap.org', '../assets/WheelMap.png', 1),
('Blog de Apps para Personas con Discapacidad', 'Blog que ofrece información sobre aplicaciones móviles y tecnología accesible para personas con discapacidad.', 'https://gaptain.com/blog/18-herramientas-digitales-para-personas-con-discapacidad/', '../assets/18.png', 1);

-- Insert into Informacion
INSERT INTO Informacion (tipo, titulo, descripcion, idRecurso)
VALUES ('General', 'Introducción al Programa', 'Un documento introductorio sobre el programa.', 1);

-- Insert into Preguntas
INSERT INTO Preguntas (pregunta, idFormulario, tipoRespuesta, opcionesRespuesta) VALUES
('Nombre', 1, 2, NULL),
('Correo', 1, 2, NULL),
('Cedula', 1, 2, NULL),
('Cuéntanos sobre el servicio o la ayuda que deseas recibir.', 1, 2, NULL),
('Indique los dias y las horas en los que le sea mas facil asistir a la reunion.', 1, 3, NULL),
('Seleccione la sede', 1, 3, 'Sede A, Sede B, Sede C'),
('Carrera', 1, 2, NULL),
('Fecha', 1, 3, NULL),
('Carne', 1, 2, NULL),
('Rol', 1, 3, 'Estudiante, Docente, Administrativo, Otro'),
('Recibió servicios y apoyo del Programa de Admisión Accesible para estudiantes con Discapacidad y Necesidades Educativas', 1, 1, 'Si, No'),
('Forma parte del Programa de Servicios para estudiantes con Discapacidad y Necesidades Educativas', 1, 1, 'Si, No'),
('Area de la denuncia', 1, 3, NULL),
('Motivo', 1, 2, NULL),
('Descripción de los aspectos o situación por denunciar', 1, 2, NULL),
('Dependencia',1,2,NULL),
('Recibió servicios y apoyo del Programa Institucional de Equiparación de Oportunidades para Personas con Discapacidad del ITCR',1,1,'Si, No'),
('Acompañamiento',1,3,'Clínica de Atención Integral en Salud (CAIS), Comisión Institucional de Salud Ocupacional (CISO), Caja Costarricense de Seguro Social, Instituto Nacional de Seguros, Otro');

-- Insert into Miembros
INSERT INTO Miembros (nombre, email, telefono, sede)
VALUES ('Juan Pérez', 'juan.perez@example.com', '555-1234', 'Sede Central');

-- Insert into FormulariosRecibidos
INSERT INTO FormulariosRecibidos (tipoUsuario, idUsuario, resouestas, email, sede, fecha, idFormulario, idEncargado)
VALUES ('Estudiante', 123, 'Respuesta a la pregunta 1', 'estudiante@example.com', 'Sede Central', '2024-10-05', 1, 1);
