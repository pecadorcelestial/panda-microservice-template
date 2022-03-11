import express from 'express';
import AddressController from '../controllers/address';
import { AddressTypeController } from '../controllers/addressType';
import { CountryController, StateController, TownController, ZipCodeController, SettlementController } from '../controllers/locations';

export class Routes {       

    private AddressController: AddressController = new AddressController();
    private AddressTypeController: AddressTypeController = new AddressTypeController();
    private CountryController: CountryController = new CountryController();
    private StateController: StateController = new StateController();
    private TownController: TownController = new TownController();
    private ZipCodeController: ZipCodeController = new ZipCodeController();
    private SettlementController: SettlementController = new SettlementController();

    public routes(app: express.Application): void {

        app.route('/')
            .get((request: express.Request, response: express.Response) => {
                response.status(200).end(JSON.stringify({
                    message: '[ROOT][GET][DIRECCIONES] request ok.'
                }))
            });

        //DDDD  IIIII RRRR  EEEEE  CCCC  CCCC IIIII  OOO  N   N EEEEE  SSSS
        //D   D   I   R   R E     C     C       I   O   O NN  N E     S
        //D   D   I   RRRR  EEE   C     C       I   O   O N N N EEE    SSS
        //D   D   I   R   R E     C     C       I   O   O N  NN E         S
        //DDDD  IIIII R   R EEEEE  CCCC  CCCC IIIII  OOO  N   N EEEEE SSSS

        //¡BORRAR!, es sólo para preubas o inicialización.
        // app.route('/addresses/drop')
        //     .delete(this.AddressController.drop);

        app.route('/addresses/byGeoNear')
            .get(this.AddressController.getAddressesByGeoLocation);

        app.route('/addresses')
            .get(this.AddressController.getAddresses)
            .post(this.AddressController.postAddresses);

        app.route('/address')
            .get(this.AddressController.getAddress)
            .post(this.AddressController.postAddress)
            .put(this.AddressController.putAddress)
            .delete(this.AddressController.deleteAddress);
        
        app.route('/address/types')
            .get(this.AddressTypeController.getAddressTypes);
        
        app.route('/address/type')
            .get(this.AddressTypeController.getAddressType)
            .post(this.AddressTypeController.postAddressType)
            .put(this.AddressTypeController.putAddressType)
            .delete(this.AddressTypeController.deleteAddressType);
        
        //PPPP   AAA  IIIII  SSSS EEEEE  SSSS
        //P   P A   A   I   S     E     S
        //PPPP  AAAAA   I    SSS  EEE    SSS
        //P     A   A   I       S E         S
        //P     A   A IIIII SSSS  EEEEE SSSS
        
        //¡BORRAR!, es sólo para preubas o inicialización.
        app.route('/countries/drop')
            .delete(this.CountryController.dropCountries);
        
        app.route('/countries/initialize')
            .post(this.CountryController.postInitializeCountries);
        
        app.route('/countries')
            .get(this.CountryController.getCountries);
        
        app.route('/country')
            .get(this.CountryController.getCountry)
            .post(this.CountryController.postCountry)
            .put(this.CountryController.putCountry)
            .delete(this.CountryController.deleteCountry);        
                
        //EEEEE  SSSS TTTTT  AAA  DDDD   OOO   SSSS
        //E     S       T   A   A D   D O   O S
        //EEE    SSS    T   AAAAA D   D O   O  SSS
        //E         S   T   A   A D   D O   O     S
        //EEEEE SSSS    T   A   A DDDD   OOO  SSSS
        
        //¡BORRAR!, es sólo para preubas o inicialización.
        app.route('/states/drop')
            .delete(this.StateController.dropStates);
        
        app.route('/states/initialize')
            .post(this.StateController.postInitializeStates);        
        
        app.route('/states')
            .get(this.StateController.getStates);
        
        app.route('/state')
            .get(this.StateController.getState)
            .post(this.StateController.postState)
            .put(this.StateController.putState)
            .delete(this.StateController.deleteState);        

        //M   M U   U N   N IIIII  CCCC IIIII PPPP  IIIII  OOO
        //MM MM U   U NN  N   I   C       I   P   P   I   O   O
        //M M M U   U N N N   I   C       I   PPPP    I   O   O
        //M   M U   U N  NN   I   C       I   P       I   O   O
        //M   M  UUU  N   N IIIII  CCCC IIIII P     IIIII  OOO

        //¡BORRAR!, es sólo para preubas o inicialización.
        app.route('/towns/drop')
            .delete(this.TownController.dropTowns);
        
        app.route('/towns/initialize')
            .post(this.TownController.postInitializeTowns);        
        
        app.route('/towns')
            .get(this.TownController.getTowns);
        
        app.route('/town')
            .get(this.TownController.getTown)
            .post(this.TownController.postTown)
            .put(this.TownController.putTown)
            .delete(this.TownController.deleteTown);        

        // CCCC  OOO  DDDD  IIIII  GGGG  OOO       PPPP   OOO   SSSS TTTTT  AAA  L
        //C     O   O D   D   I   G     O   O      P   P O   O S       T   A   A L
        //C     O   O D   D   I   G  GG O   O      PPPP  O   O  SSS    T   AAAAA L
        //C     O   O D   D   I   G   G O   O      P     O   O     S   T   A   A L
        // CCCC  OOO  DDDD  IIIII  GGGG  OOO       P      OOO  SSSS    T   A   A LLLLL

        //¡BORRAR!, es sólo para preubas o inicialización.
        app.route('/zipCodes/drop')
            .delete(this.ZipCodeController.dropZipCodes);
        
        app.route('/zipCodes/initialize')
            .post(this.ZipCodeController.postInitializeZipCodes);
        
        app.route('/zipCodes')
            .get(this.ZipCodeController.getZipCodes);
        
        app.route('/zipCode')
            .get(this.ZipCodeController.getZipCode)
            .post(this.ZipCodeController.postZipCode)
            .put(this.ZipCodeController.putZipCode)
            .delete(this.ZipCodeController.deleteZipCode);        

        // AAA   SSSS EEEEE N   N TTTTT  AAA  M   M IIIII EEEEE N   N TTTTT  OOO   SSSS
        //A   A S     E     NN  N   T   A   A MM MM   I   E     NN  N   T   O   O S
        //AAAAA  SSS  EEE   N N N   T   AAAAA M M M   I   EEE   N N N   T   O   O  SSS
        //A   A     S E     N  NN   T   A   A M   M   I   E     N  NN   T   O   O     S
        //A   A SSSS  EEEEE N   N   T   A   A M   M IIIII EEEEE N   N   T    OOO  SSSS

        //¡BORRAR!, es sólo para preubas o inicialización.
        app.route('/settlements/drop')
            .delete(this.SettlementController.dropSettlements);
        
        app.route('/settlements/initialize')
            .post(this.SettlementController.postInitializeSettlements);
        
        app.route('/settlements')
            .get(this.SettlementController.getSettlements);
        
        app.route('/settlement')
            .get(this.SettlementController.getSettlement)
            .post(this.SettlementController.postSettlement)
            .put(this.SettlementController.putSettlement)
            .delete(this.SettlementController.deleteSettlement);        

    }
}