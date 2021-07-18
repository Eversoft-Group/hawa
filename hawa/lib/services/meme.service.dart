import 'dart:convert';
import 'package:hawa/models/meme.model.dart';
import 'package:http/http.dart';

MemeModel memeList;

const BASE_URL = "https://hawa-api.herokuapp.com";
Future<MemeModel> getMeme() async {
  String apiName = "/api/get/";
  Response response;
  print("Response is ");
  print(response);
  String url = BASE_URL + apiName;
  response = await get(Uri.parse(url));
  int statusCode = response.statusCode;
  final body = json.decode(response.body);
  if (statusCode == 200) {
    memeList = MemeModel.fromJson(body);
    return memeList;
  } else {
    return memeList = MemeModel();
  }
}
