import { App } from '../../src/app';
import { Container } from "aurelia-dependency-injection";
import { StageComponent } from "aurelia-testing";
import { bootstrap } from "aurelia-bootstrapper";
import { Aurelia } from 'aurelia-framework';
import {PLATFORM} from 'aurelia-pal';

let component;
let viewModel: App;

describe('the app', () => {
  it('says hello', () => {
    expect(new App().message).toBe('Hello World!');
  });

  it('says hello too', done => {
    let container: Container = new Container();

    viewModel = container.get(App);
    viewModel.message = "42";

    component = StageComponent
        .withResources()
        .inView("<app></app>")
        .boundTo(viewModel);

    component.bootstrap(aurelia => {
        aurelia.use
            .standardConfiguration();
    });

    component.create(bootstrap).then(() => {
        console.log('viewModel.message' + viewModel.message);
        expect(viewModel.message).toBe('42');
        done();
      });
  });
});
