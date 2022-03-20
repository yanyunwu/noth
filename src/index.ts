export { Noth } from './noth'
import { Noth } from './noth'
// this === window && (window['Noht'] as object = Noht);
if (!(typeof window === 'undefined')) {
    (window as any).Noth = Noth
}

