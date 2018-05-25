/**
 * Created by wuhaiying on 2018/4/3.
 */
import _ from 'lodash';
function component(){
    var element = document.createElement('div');

    element.innerHTML = _.join(['hello','webpack'],'');

    element.classList.add('webpack');

    return element;
}

document.body.appendChild(component());