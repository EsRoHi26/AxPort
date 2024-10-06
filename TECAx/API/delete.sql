-- Insert into Formularios
INSERT INTO Formularios (nombre, descripcion)
VALUES ('Formulario de Inscripción', 'Formulario para inscribirse en el programa.');

-- Insert into Recursos_Adicionales
INSERT INTO Recursos_Adicionales (nombre, descripcion, URL, imagen, idFormulario)
VALUES ('Guía de Usuario', 'Guía para el uso del sistema.', 'http://example.com/guia', 'http://example.com/imagen.jpg', 1);

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
