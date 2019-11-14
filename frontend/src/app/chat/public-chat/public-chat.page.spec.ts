import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicChatPage } from './public-chat.page';

describe('PublicChatPage', () => {
  let component: PublicChatPage;
  let fixture: ComponentFixture<PublicChatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicChatPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicChatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
