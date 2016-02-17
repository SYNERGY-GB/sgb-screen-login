<h1>SGB-screen-login</h1>

<h3>Propósito</h3>

Esta pantalla sirve para controlar el ingreso de los usuarios a una aplicación.

<h3>Parametros de la pantalla</h3>

Como se trata de una pantalla de inicio de sesión, las validaciones pueden cambiar entre cada aplicación, por lo tanto, estas validaciones se encuentran parametrizadas para que puedan cambiar dependiendo de los requerimientos. La configuración debe recibirse en los parámetros de la pantalla

- **onScreenValidation**: booleano que indica si se quiere validar el formato de los campos en la pantalla
- **usernameValidation**: expresión regular correspondiente a la validación del nombre de usuario
- **passwordValidation**: expresión regular correspondiente a la validación de la contraseña del usuario
- **maxAttempts**: número máximo de intentos que tiene el usuario para iniciar sesión
- **loginHandler**: en caso de que se necesite un manejador de sesión muy especifico, sino se utilizará un manejador por defecto. 
- **templateType**: función o nombre que permita identificar el template a utilizar para la pantalla
- **clearSubmitButtons**: Booleano que indica si se quiere colocar un botón para limpiar los campos
- **welcomeResource**: imagen de bienvenida ubicada en la parte superior del cuadro de login

<h3>Ejemplo de configuracion del archivo screen.ts</h3>
<pre>
"login": {
    type: 'sgb-screen-login',
    default: true,
    params: {
        title:"Hello there! I'm login",
        onScreenValidation:true,
        usernameValidation:"Synergy-GB",
        passwordValidation:"1234",
        clearSubmitButtons: true
    }
}
</pre>

<h3> Diseño </h3>
![Alt Text](https://s3.amazonaws.com/megazord-framework/balsamiq+mockups/sgb-screen-login.png)