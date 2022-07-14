export class PersonController {
    speak (name?:string):string{
        return `OLá ${name?.toLocaleUpperCase() ?? 'Fulano'}!!!`
    }
}
