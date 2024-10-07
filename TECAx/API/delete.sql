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
INSERT INTO Preguntas (pregunta, tipoRespuesta, opcionesRespuesta, idFormulario)
VALUES ('¿Cómo te enteraste del programa?', 1, 'Amigo, Internet, Redes Sociales', 1);

-- Insert into Miembros
INSERT INTO Miembros (nombre, email, telefono, sede)
VALUES ('Juan Pérez', 'juan.perez@example.com', '555-1234', 'Sede Central');

-- Insert into FormulariosRecibidos
INSERT INTO FormulariosRecibidos (tipoUsuario, idUsuario, resouestas, email, sede, fecha, idFormulario, idEncargado)
VALUES ('Estudiante', 123, 'Respuesta a la pregunta 1', 'estudiante@example.com', 'Sede Central', '2024-10-05', 1, 1);
